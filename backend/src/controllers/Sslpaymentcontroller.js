import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const SSLCommerzPayment = require('sslcommerz-lts');

import OrderModel from '../models/Order.model.js';
import CartModel from '../models/Cart.model.js';

// ── Helper — reads env vars fresh every call (not at module load time) ────
const getSSLConfig = () => ({
  store_id:     process.env.SSL_STORE_ID,
  store_passwd: process.env.SSL_STORE_PASSWORD,
  is_live:      process.env.NODE_ENV === 'production',
  backendUrl:   process.env.BACKEND_URL  || 'http://localhost:3000',
  frontendUrl:  process.env.FRONTEND_URL || 'http://localhost:5173',
});

// ── Initiate payment ───────────────────────────────────────────────────────
export const initiateSSLPayment = async (req, res) => {
  const { store_id, store_passwd, is_live, backendUrl, frontendUrl } = getSSLConfig();

  console.log('🔵 SSL Init — store_id:', store_id);
  console.log('🔵 SSL Init — is_live:', is_live);

  if (!store_id || !store_passwd) {
    return res.status(500).json({
      success: false,
      message: 'Payment gateway not configured. Check SSL_STORE_ID and SSL_STORE_PASSWORD in .env',
    });
  }

  const userId = req.user?.id || null;
  const { shippingAddress, guestId } = req.body;

  if (!shippingAddress?.address || !shippingAddress?.city ||
      !shippingAddress?.phone  || !shippingAddress?.name) {
    return res.status(400).json({ success: false, message: 'Shipping address incomplete.' });
  }

  if (!userId && !guestId) {
    return res.status(400).json({ success: false, message: 'guestId required for guest users.' });
  }

  try {
    const cart = await (
      userId
        ? CartModel.findOne({ user: userId })
        : CartModel.findOne({ guestId })
    ).populate('products.product');

    console.log('🔵 SSL Init — cart found:', cart ? 'yes' : 'no');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty.' });
    }

    const totalAmount = cart.products.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0
    );

    console.log('🔵 SSL Init — totalAmount:', totalAmount);

    const order = new OrderModel({
      user:      userId || undefined,
      guestInfo: userId ? undefined : {
        name:  shippingAddress.name,
        phone: shippingAddress.phone,
        email: shippingAddress.email || '',
      },
      items: cart.products.map(item => ({
        product:  item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress,
      totalAmount,
      paymentMethod: 'Online',
      paymentStatus: 'pending',
      status:        'pending',
    });

    await order.save();

    const tran_id = order._id.toString();

    const sslData = {
      total_amount:     totalAmount,
      currency:         'BDT',
      tran_id,
      success_url:      `${backendUrl}/api/v1/payment/ssl/success/${tran_id}`,
      fail_url:         `${backendUrl}/api/v1/payment/ssl/fail/${tran_id}`,
      cancel_url:       `${backendUrl}/api/v1/payment/ssl/cancel/${tran_id}`,
      ipn_url:          `${backendUrl}/api/v1/payment/ssl/ipn`,
      shipping_method:  'Courier',
      product_name:     'ZapZoneBD Order',
      product_category: 'Electronics',
      product_profile:  'general',
      cus_name:         shippingAddress.name,
      cus_email:        shippingAddress.email || 'customer@zapzonebd.com',
      cus_add1:         shippingAddress.address,
      cus_city:         shippingAddress.city,
      cus_country:      'Bangladesh',
      cus_phone:        shippingAddress.phone,
      ship_name:        shippingAddress.name,
      ship_add1:        shippingAddress.address,
      ship_city:        shippingAddress.city,
      ship_postcode:    shippingAddress.postalCode || '1207',
      ship_country:     'Bangladesh',
      cus_postcode:     shippingAddress.postalCode || '1207',
    };

    console.log('🔵 SSL Init — calling SSLCommerz with store_id:', store_id);
    const sslcz       = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(sslData);

    console.log('🔵 SSL Response:', JSON.stringify(apiResponse));

    if (apiResponse?.GatewayPageURL) {
      return res.status(200).json({
        success:    true,
        gatewayUrl: apiResponse.GatewayPageURL,
        orderId:    tran_id,
      });
    }

    await OrderModel.findByIdAndDelete(order._id);
    return res.status(500).json({
      success:     false,
      message:     apiResponse?.failedreason || 'SSLCommerz did not return a payment URL.',
      sslResponse: apiResponse,
    });

  } catch (err) {
    console.error('❌ SSLCommerz init error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Success callback ───────────────────────────────────────────────────────
export const sslSuccess = async (req, res) => {
  const { store_id, store_passwd, is_live, frontendUrl } = getSSLConfig();
  const { tran_id } = req.params;
  console.log('🟢 SSL Success — tran_id:', tran_id);

  try {
    const order = await OrderModel.findById(tran_id);
    if (!order) return res.redirect(`${frontendUrl}/payment/failed`);

    const sslcz      = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const validation = await sslcz.validate({ val_id: req.body.val_id });

    console.log('🟢 Validation status:', validation?.status);

    if (validation?.status === 'VALID' || validation?.status === 'VALIDATED') {
      order.paymentStatus = 'paid';
      order.status        = 'confirmed';
      await order.save();
      if (order.user) await CartModel.findOneAndDelete({ user: order.user });
      return res.redirect(`${frontendUrl}/payment/success?orderId=${tran_id}`);
    }

    order.paymentStatus = 'failed';
    await order.save();
    return res.redirect(`${frontendUrl}/payment/failed?orderId=${tran_id}`);

  } catch (err) {
    console.error('❌ SSL success error:', err.message);
    res.redirect(`${frontendUrl}/payment/failed`);
  }
};

// ── Fail callback ──────────────────────────────────────────────────────────
export const sslFail = async (req, res) => {
  const { frontendUrl } = getSSLConfig();
  const { tran_id } = req.params;
  console.log('🔴 SSL Fail — tran_id:', tran_id);
  try { await OrderModel.findByIdAndUpdate(tran_id, { paymentStatus: 'failed' }); } catch {}
  res.redirect(`${frontendUrl}/payment/failed?orderId=${tran_id}`);
};

// ── Cancel callback ────────────────────────────────────────────────────────
export const sslCancel = async (req, res) => {
  const { frontendUrl } = getSSLConfig();
  const { tran_id } = req.params;
  console.log('🟡 SSL Cancel — tran_id:', tran_id);
  try { await OrderModel.findByIdAndDelete(tran_id); } catch {}
  res.redirect(`${frontendUrl}/checkout?cancelled=true`);
};

// ── IPN ────────────────────────────────────────────────────────────────────
export const sslIPN = async (req, res) => {
  const { tran_id, status } = req.body;
  console.log('📡 IPN — tran_id:', tran_id, 'status:', status);
  if (!tran_id) return res.status(400).send('No tran_id');
  try {
    if (status === 'VALID' || status === 'VALIDATED') {
      await OrderModel.findByIdAndUpdate(tran_id, {
        paymentStatus: 'paid',
        status:        'confirmed',
      });
    }
    res.status(200).send('IPN received');
  } catch (err) {
    res.status(500).send('IPN error');
  }
};