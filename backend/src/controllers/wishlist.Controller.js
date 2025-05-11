import WishlistModel from "../models/Wishlist.model.js";


export const addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    let wishlist = await WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new WishlistModel({ user: userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}



// Get user wishlist
export const getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await WishlistModel.findOne({ user: userId }).populate("products");
    res.status(200).json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};



// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const wishlist = await WishlistModel.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    );
    res.status(200).json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};