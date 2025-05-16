import ProductModel from "../models/Product.model.js";

// Add a review
export const addReview = async (req, res) => {
  const { comment, rating } = req.body;
  const productId = req.params.productId;
  const userId = req.user._id;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const alreadyReview = product.reviews.find(
      (rev) => rev.user.toString() === userId.toString()
    );

    if (alreadyReview) {
      return res.status(400).json({ message: "You already reviewed this product." });
    }

    product.reviews.push({ user: userId, comment, rating: Number(rating) });

    product.ratings =
      product.reviews.reduce((acc, r) => r.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};



export const getallReviews=async (req,res)=>{
    const productId=req.params.productId;

    try{
        const product=await ProductModel.findById(productId)
        .populate("reviews.user","name email")

        if(!product){
            return res.status(404).json({message:"product not found"})
        }
         res.status(200).json({
      reviews: product.reviews,
      averageRating: product.ratings,
      totalReviews: product.reviews.length,
    });
    }catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
}