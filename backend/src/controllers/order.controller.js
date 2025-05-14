import CartModel from "../models/Cart.model.js";
import OrderModel from "../models/Order.model.js";



export const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress, paymentMethod } = req.body;

  if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.country || !shippingAddress.name || !shippingAddress.email || !shippingAddress.phone) {
    return res.status(400).json({ success: false, message: "Shipping address is incomplete." });
  }

  if (!paymentMethod || !['COD', 'Online'].includes(paymentMethod)) {
    return res.status(400).json({ success: false, message: "Invalid or missing payment method." });
  }

  try {
    const cart = await CartModel.findOne({ user: userId }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }

    const totalAmount = cart.products.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const order = new OrderModel({
      user: userId,
      items: cart.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'pending' : 'paid' // You may enhance this using Stripe webhook for real-time status
    });

    await order.save();

    cart.products = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order
    });
  } catch (err) {
    console.error("Order placement failed:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};




export const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user.id }).populate("items.product");
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


export const getSingleOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  if (!["pending", "shipped", "delivered", "cancelled"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
