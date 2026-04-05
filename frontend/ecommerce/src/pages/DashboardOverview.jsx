import { useEffect, useState } from "react";
import axiosInstance from "./../api/axiosInstance";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import RecentOrder from "../components/Dashboard/RecentOrder.jsx";
import {
  FiShoppingBag, FiUsers, FiPackage, FiTrendingUp,
  FiRefreshCw
} from "react-icons/fi";
import { FaBolt } from "react-icons/fa";

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7", "#ef4444"];

const StatCard = ({ icon, label, value, sub, color, loading }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4`}>
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</p>
      {loading ? (
        <div className="h-7 w-24 bg-gray-200 animate-pulse rounded mt-1" />
      ) : (
        <p className="text-2xl font-extrabold text-gray-800 mt-0.5">{value}</p>
      )}
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const DashboardOverview = () => {
  const [stats, setStats]           = useState(null);
  const [salesReport, setSalesReport] = useState([]);
  const [pieData, setPieData]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [reportType, setReportType] = useState("daily");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (type = "daily") => {
    try {
      const [statsRes, reportRes] = await Promise.all([
        axiosInstance.get("/admin/stats"),
        axiosInstance.get(`/admin/stats-report?type=${type}`),
      ]);

      setStats(statsRes.data.data);
      setSalesReport(reportRes.data.report || []);
      setPieData([
        { name: "Users",    value: statsRes.data.data.totalUsers    || 0 },
        { name: "Orders",   value: statsRes.data.data.totalOrders   || 0 },
        { name: "Products", value: statsRes.data.data.totalProducts || 0 },
      ]);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.error("Dashboard error:", err);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(reportType); }, [reportType]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(reportType);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
          <p className="font-bold text-gray-700">{label}</p>
          <p className="text-blue-600 font-semibold">৳{payload[0]?.value?.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FaBolt className="text-yellow-400" />
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
        >
          <FiRefreshCw className={`${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<FiTrendingUp className="text-2xl text-blue-600" />}
          label="Total Revenue"
          value={loading ? "..." : `৳${stats?.totalSales?.toLocaleString() || 0}`}
          sub="All time sales"
          color="bg-blue-50"
          loading={loading}
        />
        <StatCard
          icon={<FiShoppingBag className="text-2xl text-green-600" />}
          label="Total Orders"
          value={loading ? "..." : stats?.totalOrders || 0}
          sub="All orders"
          color="bg-green-50"
          loading={loading}
        />
        <StatCard
          icon={<FiUsers className="text-2xl text-purple-600" />}
          label="Total Users"
          value={loading ? "..." : stats?.totalUsers || 0}
          sub="Registered users"
          color="bg-purple-50"
          loading={loading}
        />
        <StatCard
          icon={<FiPackage className="text-2xl text-orange-600" />}
          label="Total Products"
          value={loading ? "..." : stats?.totalProducts || 0}
          sub="Active products"
          color="bg-orange-50"
          loading={loading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Bar Chart — Sales Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-800">Sales Trend</h3>
              <p className="text-xs text-gray-400 mt-0.5">Revenue over time</p>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {["daily", "monthly"].map(t => (
                <button
                  key={t}
                  onClick={() => setReportType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    reportType === t
                      ? "bg-white text-blue-600 shadow"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {salesReport.length === 0 ? (
            <div className="flex items-center justify-center h-[260px] text-gray-300">
              <div className="text-center">
                <FiTrendingUp className="text-4xl mx-auto mb-2" />
                <p className="text-sm">No sales data yet</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={salesReport} barSize={32}>
                <XAxis
                  dataKey="_id"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `৳${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="totalSales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="mb-5">
            <h3 className="font-bold text-gray-800">Overview</h3>
            <p className="text-xs text-gray-400 mt-0.5">System breakdown</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2 mt-3">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Stats Row */}
      {!loading && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Avg Order Value", value: `৳${stats.totalOrders ? Math.round(stats.totalSales / stats.totalOrders) : 0}`, icon: "📊" },
            { label: "Conversion Rate", value: "—", icon: "🎯" },
            { label: "Today's Orders", value: "—", icon: "📅" },
            { label: "Pending Orders", value: "—", icon: "⏳" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-lg font-extrabold text-gray-800 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-800">Recent Orders</h3>
            <p className="text-xs text-gray-400 mt-0.5">Latest customer orders</p>
          </div>
        </div>
        <RecentOrder />
      </div>

    </div>
  );
};

export default DashboardOverview;