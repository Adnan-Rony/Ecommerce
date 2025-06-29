import React, { useEffect, useState } from "react";
import axiosInstance from "./../api/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AllConfirmOrders from "../components/Dashboard/AllConfirmOrder.jsx";
import RecentOrder from "../components/Dashboard/RecentOrder.jsx";

const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#f97316"]; // Tailwind colors

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [salesReport, setSalesReport] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, reportRes] = await Promise.all([
          axiosInstance.get("/admin/stats"),
          axiosInstance.get("/admin/stats-report?type=daily"),
        ]);

        setStats(statsRes.data.data);
        setSalesReport(reportRes.data.report);

        const pieTransformed = [
          { name: "Users", value: statsRes.data.data.totalUsers },
          { name: "Orders", value: statsRes.data.data.totalOrders },
          { name: "Products", value: statsRes.data.data.totalProducts },
        ];
        setPieData(pieTransformed);
        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-3xl font-bold">Admin Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="card bg-base-200 shadow animate-pulse h-28"
            ></div>
          ))
        ) : (
          <>
            <div className="card bg-base-200 shadow">
              <div className="card-body p-4">
                <p className="text-sm text-gray-600">Total Sales</p>
                <h3 className="text-2xl font-bold">
                  ${stats.totalSales.toFixed(2)}
                </h3>
              </div>
            </div>

            <div className="card bg-base-200 shadow">
              <div className="card-body p-4">
                <p className="text-sm text-gray-600">Orders</p>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              </div>
            </div>

            <div className="card bg-base-200 shadow">
              <div className="card-body p-4">
                <p className="text-sm text-gray-600">Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
            </div>

            <div className="card bg-base-200 shadow">
              <div className="card-body p-4">
                <p className="text-sm text-gray-600">Products</p>
                <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h4 className="text-xl font-semibold mb-4">Sales Trend (Daily)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesReport}>
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="totalSales"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h4 className="text-xl font-semibold mb-4">System Breakdown</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Placeholder */}
      {/* ... inside your DashboardOverview render ... */}
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h4 className="text-xl font-semibold mb-4">Recent Orders</h4>
          <RecentOrder />

        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
