import CartModel from "../models/Cart.model.js";

// Helper — find cart by user or guestId
const findCart = async (userId, guestId) => {
  if (userId) return await CartModel.findOne({ user: userId });
  if (guestId) return await CartModel.findOne({ guestId });
  return null;
};

export const addToCart = async (req, res) => {
  console.log("Cart add body:", req.body);
  const userId = req.user?.id || null;
  const { productId, quantity, size, guestId } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ success: false, message: "Invalid product ID or quantity." });
  }

  if (!userId && !guestId) {
    return res.status(400).json({ success: false, message: "guestId required for guest users." });
  }

  try {
    let cart = await findCart(userId, guestId);
    console.log("Existing cart:", cart); // DEBUG

    if (!cart) {
      console.log("Creating new cart..."); // DEBUG
      cart = new CartModel({
        user: userId || undefined,
        guestId: userId ? undefined : guestId,
        products: [{ product: productId, quantity: quantity || 1, size }],
      });
    } else {
      const existingItem = cart.products.find(
        item => item.product.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.products.push({ product: productId, quantity: quantity || 1, size });
      }
    }

    console.log("Saving cart..."); // DEBUG
    await cart.save();
    console.log("Cart saved!"); // DEBUG
    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Cart save error:", err.message); // DEBUG
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user?.id || null;
  const guestId = req.query.guestId || null;

  try {
    let cartQuery;
    if (userId) {
      cartQuery = CartModel.findOne({ user: userId });
    } else if (guestId) {
      cartQuery = CartModel.findOne({ guestId });
    } else {
      return res.status(200).json({
        success: true,
        cart: { products: [], totalPrice: 0 }
      });
    }

    const cart = await cartQuery.populate({
      path: "products.product",
      select: "name price images category brand"
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { products: [], totalPrice: 0 }
      });
    }

    const totalPrice = cart.products.reduce((acc, item) => {
      if (item.product?.price) return acc + item.product.price * item.quantity;
      return acc;
    }, 0);

    res.status(200).json({
      success: true,
      cart: { ...cart.toObject(), totalPrice }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: err.message
    });
  }
};

export const updateCartItem = async (req, res) => {
  const userId = req.user?.id || null;
  const { productId, quantity, guestId } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ success: false, message: "Invalid product ID or quantity." });
  }

  try {
    const cart = await findCart(userId, guestId);
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found." });

    const itemIndex = cart.products.findIndex(
      item => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart." });
    }

    cart.products[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const removeCartItem = async (req, res) => {
  const userId = req.user?.id || null;
  const { productId, guestId } = req.body;

  if (!productId) {
    return res.status(400).json({ success: false, message: "Product ID is required." });
  }

  try {
    const cart = await findCart(userId, guestId);
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found." });

    cart.products = cart.products.filter(
      item => item.product.toString() !== productId
    );
    await cart.save();

    res.status(200).json({ success: true, message: "Product removed from cart.", cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user?.id || null;
  const guestId = req.body.guestId || null;

  try {
    if (userId) await CartModel.findOneAndDelete({ user: userId });
    else if (guestId) await CartModel.findOneAndDelete({ guestId });

    res.status(200).json({ success: true, message: "Cart cleared." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};