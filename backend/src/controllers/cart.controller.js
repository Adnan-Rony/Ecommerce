import CartModel from "../models/Cart.model.js";
import ProductModel from "../models/Product.model.js";

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity,size } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ success: false, message: "Invalid product ID or quantity." });
  }

  try {
    let cart = await CartModel.findOne({ user: userId })
    .populate('products.product');

    if (!cart) {
      // Create new cart
      cart = new CartModel({
        user: userId,
        products: [{ product: productId, quantity,size }],
      });
    } else {
      // Update existing cart
      const existingItem = cart.products.find(item => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity,size });
      }
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};



export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await CartModel.findOne({ user: userId }).populate({
      path: "products.product",
      select: "name price images category brand"
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          products: [],
          totalPrice: 0
        }
      });
    }

    // Calculate total price
    const totalPrice = cart.products.reduce((acc, item) => {
      if (item.product && item.product.price) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);

    res.status(200).json({
      success: true,
      cart: {
        ...cart.toObject(),
        totalPrice
      }
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: err.message,
    });
  }
};



export const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ success: false, message: "Invalid product ID or quantity." });
  }

  try {
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    const itemIndex = cart.products.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart." });
    }

    cart.products[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cart,
    });
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: err.message,
    });
  }
}; 


export const removeCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ success: false, message: "Product ID is required." });
  }

  try {
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    const filteredProducts = cart.products.filter(
      item => item.product.toString() !== productId
    );

    if (filteredProducts.length === cart.products.length) {
      return res.status(404).json({ success: false, message: "Product not found in cart." });
    }

    cart.products = filteredProducts;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully.",
      cart,
    });
  } catch (err) {
    console.error("Error removing product from cart:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


export const clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    await CartModel.findOneAndDelete({ user: userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};




