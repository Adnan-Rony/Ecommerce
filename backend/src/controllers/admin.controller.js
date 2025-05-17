import OrderModel from "../models/Order.model.js";
import ProductModel from "../models/Product.model.js";
import usersModel from "../models/Users.model.js";


export const getAdminStats = async (req, res) => {
  try {
    const totalSales = await OrderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const totalOrders = await OrderModel.countDocuments();
    const totalUsers = await usersModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalSales: totalSales[0]?.total || 0,
        totalOrders,
        totalUsers,
        totalProducts
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch stats", error: err.message });
  }
};



export const getSalesReport = async (req, res) => {
  const { type } = req.query; // 'daily' or 'monthly'

  let groupBy;
  if (type === "monthly") {
    groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
  } else {
    groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
  }

  try {
    const report = await OrderModel.aggregate([
      { $group: { _id: groupBy, totalSales: { $sum: "$totalAmount" }, orderCount: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, message: "Report generation failed", error: err.message });
  }
};