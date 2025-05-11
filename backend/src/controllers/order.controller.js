import CartModel from "../models/Cart.model.js";
import OrderModel from "../models/Order.model.js";



export const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress } = req.body;

  if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
    return res.status(400).json({ success: false, message: "Shipping address is incomplete." });
  }

  try {
    // Get user's cart
    const cart = await CartModel.findOne({ user: userId }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }

    // Calculate total amount
    const totalAmount = cart.products.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    // Create order
    const order = new OrderModel({
      user: userId,
      items: cart.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      shippingAddress,
      totalAmount,
    });

    await order.save();

    // Clear cart after order placed
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