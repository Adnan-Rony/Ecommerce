import CountUp from "react-countup";
import { MdOutlineEmail } from "react-icons/md";
import { FaUsers, FaPaperPlane, FaBoxOpen, FaStar } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

export const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("সঠিক email address দিন।");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("✅ Successfully subscribed!");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  const stats = [
    { icon: <FaUsers className="text-blue-500 text-xl" />,     end: 1000,  suffix: "+", label: "Subscribers",       bg: "bg-blue-50" },
    { icon: <FaPaperPlane className="text-green-500 text-xl" />, end: 500, suffix: "+", label: "Orders Delivered",  bg: "bg-green-50" },
    { icon: <FaBoxOpen className="text-orange-500 text-xl" />,  end: 100,  suffix: "+", label: "Products Available", bg: "bg-orange-50" },
    { icon: <FaStar className="text-yellow-500 text-xl" />,     end: 98,   suffix: "%", label: "Satisfaction Rate", bg: "bg-yellow-50" },
  ];

  return (
    <section className="bg-gradient-to-br from-[#0f2d6e] to-[#1d4c9e] py-16 px-4">
      <div className="max-w-screen-xl mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bg} rounded-2xl p-5 text-center shadow-lg`}>
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <h3 className="text-2xl font-extrabold text-gray-800">
                <CountUp
                  end={stat.end}
                  enableScrollSpy
                  scrollSpyOnce
                  duration={2}
                />
                {stat.suffix}
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Newsletter Box */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">

          {/* Icon */}
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <MdOutlineEmail className="text-3xl text-blue-900" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Stay Updated with
            <span className="text-yellow-300"> ZapZone BD</span>
          </h2>
          <p className="text-blue-200 text-sm md:text-base mb-8">
            সর্বশেষ অফার, নতুন পণ্য এবং এক্সক্লুসিভ ডিল সবার আগে পান।
            <br />
            <span className="text-white/60 text-xs">
              Spam নয় — শুধু সেরা অফার।
            </span>
          </p>

          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="আপনার email address লিখুন"
              className="flex-1 bg-white/20 backdrop-blur border border-white/30 text-white placeholder-white/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-6 py-3 rounded-xl transition shadow-lg text-sm disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? "..." : "Subscribe →"}
            </button>
          </div>

          <p className="text-white/40 text-xs mt-4">
            যেকোনো সময় unsubscribe করতে পারবেন।
          </p>
        </div>

      </div>
    </section>
  );
};