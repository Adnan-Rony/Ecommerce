import { Link } from "react-router-dom";
import img from "../../assets/poster-03.png";
import { useEffect, useState } from "react";

const HeadphonePromo = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Set your target end date here
  const targetDate = new Date("2025-07-15T00:00:00").getTime();

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdown);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-[#f6cece] to-[#e4efff]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between p-10 my-5 max-w-7xl mx-auto">
        {/* Left content */}
        <div className="max-w-md text-center md:text-left">
          <p className="text-sm text-blue-600 font-semibold flex items-center gap-2">
            <span role="img" aria-label="music">🎵</span> Don’t Miss!!
          </p>
          <h2 className="lg:text-4xl text-2xl font-semibold text-gray-800 mt-2">
            Enhance Your <br /> Music Experience
          </h2>

          {/* Countdown Timer */}
          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            {[
              { label: "Day", value: timeLeft.days },
              { label: "Hrs", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map(({ label, value }, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl font-bold text-gray-800 bg-white p-4 rounded-full shadow">
                  {value}
                </div>
                <span className="text-sm mt-1 text-gray-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <Link to="/allcategories">
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Check it Out!
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img src={img} alt="Headphones" />
        </div>
      </div>
    </div>
  );
};

export default HeadphonePromo;
