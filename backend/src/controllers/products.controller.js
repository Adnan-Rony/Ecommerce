import ProductModel from "../models/Product.model.js";
import usersModel from "../models/Users.model.js";



// Create a new product
export const createProduct = async (req, res) => {
  const { name, price, description, category, images, brand, stock, ratings, reviews } = req.body;

  // Validate required fields
  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: 'Name, price, and category are required fields.' });
  }

  // Validate price and stock as numbers
  if (isNaN(price) || price < 0) {
    return res.status(400).json({ success: false, message: 'Invalid price value. It should be a positive number.' });
  }

  if (isNaN(stock) || stock < 0) {
    return res.status(400).json({ success: false, message: 'Invalid stock value. It should be a positive number.' });
  }

  // Validate images (if provided)
  if (images && !Array.isArray(images)) {
    return res.status(400).json({ success: false, message: 'Images should be an array.' });
  }

  try {
    const user = req.user; // From the verified token middleware
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized, user not found" });
    }

    // Create product
    const product = new ProductModel({
      name,
      price,
      description: description || '', 
      category,
      images,
      brand,
      stock,
      createdBy: user.id, // Set the user ID for createdBy
      ratings: ratings || 0,  // Default to 0 if not provided
      reviews: reviews || [],  // Default to empty array if not provided
    });

    // Save to the database
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (err) {
    // Error handling
    console.error('Product creation failed:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Product creation failed', 
      error: err.message 
    });
  }
};







export const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      ratings,
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    const filter = {};

    // Search by name or brand
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }
   

    // Filter by minimum rating
    if (ratings) {
      filter.ratings = { $gte: Number(ratings) };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Fetch and populate with sorting
    const products = await ProductModel.find(filter)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .populate('reviews.user', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: err.message
    });
  }
};




export const getProductById = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters

  try {
    // Find product by ID
    const product = await ProductModel.findById(id)
     .populate('reviews.user','name email') // Populate user details in reviews
     .populate('createdBy', 'name email') 

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};



export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const user = await usersModel.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    const isOwner = product.createdBy?.toString() === user._id.toString();
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not allowed to delete this product",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const user = await usersModel.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    const isOwner = product.createdBy?.toString() === user._id.toString();
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: "Forbidden: Not allowed to update this product" });
    }

    // Optional: Validate numeric fields
    if (updates.price && (isNaN(updates.price) || updates.price < 0)) {
      return res.status(400).json({ success: false, message: "Invalid price value." });
    }
    if (updates.stock && (isNaN(updates.stock) || updates.stock < 0)) {
      return res.status(400).json({ success: false, message: "Invalid stock value." });
    }

    // Optional: Ensure images is an array if provided
    if (updates.images && !Array.isArray(updates.images)) {
      return res.status(400).json({ success: false, message: "Images must be an array." });
    }

    // Perform update
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Product update failed:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


export const getRecommendedProducts = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const recommendedProducts = await ProductModel.find({
      category: product.category,
      _id: { $ne: product._id }, 
    }).limit(5);

    res.status(200).json(recommendedProducts);
  } catch (error) {
    console.error("Error getting recommended products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};