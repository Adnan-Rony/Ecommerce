const LoadingSpinner = ({ fullScreen = true }) => {
  return (
    <div className={`flex flex-col justify-center items-center gap-5 ${
      fullScreen ? "h-screen" : "h-40"
    }`}>

      {/* Animated Logo */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />

        {/* Inner ring */}
        <div className="absolute inset-2 w-10 h-10 rounded-full border-4 border-yellow-100 border-b-yellow-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }} />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Brand */}
      <div className="text-center">
        <p className="text-xl font-extrabold tracking-tight">
          <span className="text-[#1d4c9e]">Zap</span>
          <span className="text-gray-800">Zone</span>
          <span className="ml-1 bg-yellow-400 text-blue-900 text-xs px-1.5 py-0.5 rounded font-black">BD</span>
        </p>
        <p className="text-xs text-gray-400 mt-1 animate-pulse">Loading...</p>
      </div>

    </div>
  );
};

export default LoadingSpinner;