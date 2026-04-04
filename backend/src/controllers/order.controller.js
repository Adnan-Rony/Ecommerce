import CartModel from "../models/Cart.model.js";
import OrderModel from "../models/Order.model.js";

export const placeOrder = async (req, res) => {

  // DEBUG
  console.log("Order body:", JSON.stringify(req.body, null, 2));
  // DEBUG END


  const userId = req.user?.id || null;
  const { shippingAddress, paymentMethod, guestId } = req.body;

  if (!shippingAddress?.address || !shippingAddress?.city ||
      !shippingAddress?.phone || !shippingAddress?.name) {
    return res.status(400).json({ success: false, message: "Shipping address is incomplete." });
  }

  if (!paymentMethod || !["COD", "Online"].includes(paymentMethod)) {
    return res.status(400).json({ success: false, message: "Invalid payment method." });
  }

  if (!userId && !guestId) {
    return res.status(400).json({ success: false, message: "guestId required for guest users." });
  }

  try {
    const cart = await (userId
      ? CartModel.findOne({ user: userId })
      : CartModel.findOne({ guestId })
    ).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }

    const totalAmount = cart.products.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const order = new OrderModel({
      user: userId || undefined,
      guestInfo: userId ? undefined : {
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        email: shippingAddress.email || ""
      },
      items: cart.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid"
    });

    await order.save();

    // Clear cart after order placed
    if (userId) await CartModel.findOneAndDelete({ user: userId });
    else await CartModel.findOneAndDelete({ guestId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order
    });
  } catch (err) {
    console.error("Order placement failed:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user.id })
      .populate("items.product")
      .populate("user", "name email");
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getUserAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({})
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });
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

export const trackOrderByPhone = async (req, res) => {
  const { phone } = req.params;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone number required." });
  }

  try {
    const orders = await OrderModel.find({
      "shippingAddress.phone": phone
    })
      .populate("items.product", "name price images")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found with this phone number."
      });
    }

    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  if (!["pending", "confirmed", "shipped", "delivered", "cancelled"].includes(status)) {
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