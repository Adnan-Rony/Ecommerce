import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../assets/oldest_apple_products_2024_hero.webp";

import headset from "../../assets/instant-cameras.jpg";
import dualsense from "../../assets/new-dualsense.jpg";
import camera from "../../assets/logitech-aurora-headset-opt-760x312.jpg";

import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper/modules";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className=" ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[460px]">
        {/* Swiper Section - Visible on all devices */}
        <div className="h-[300px] sm:h-[400px] lg:h-full overflow-hidden  relative">
          <Swiper
            scrollbar={{ hide: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Scrollbar, Autoplay]}
            className="mySwiper w-full h-full"
          >
            {[img1].map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${img})` }}
                  />

                  {/* Overlay with button */}
                  <div className="absolute inset-0 z-10 flex items-end mr-2 mb-4 justify-end pr-6 sm:pr-12">
                    <Link to="/allcategories">
                      <button className="btn btn-outline text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Side Content - Hidden on small screens */}
        <div className="hidden lg:flex flex-col gap-2 h-full">
          {/* Top Card */}
          <div className="group relative h-full flex-1  overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${camera})` }}
            />
            <div className="absolute inset-0 z-10 bg-black/30 rounded-xl" />
            <div className="relative z-20 p-4 text-white text-center sm:text-left">
              <h2 className="text-lg font-bold">Aurora Headset</h2>
              <p className="text-sm">Crystal Clear Sound</p>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {/* DualSense */}
            <div className="group relative h-full rounded-xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${dualsense})` }}
              />
              <div className="absolute inset-0 z-10 bg-black/30 rounded-xl" />
              <div className="relative z-20 p-4 text-white text-center sm:text-left">
                <h2 className="text-lg font-bold">New Dual Sense</h2>
                <p className="text-sm">For PlayStation 5</p>
              </div>
            </div>

            {/* Instant Camera */}
            <div className="group relative h-full rounded-xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${headset})` }}
              />
              <div className="absolute inset-0 z-10 bg-black/30 rounded-xl" />
              <div className="relative z-20 p-4 text-white text-center sm:text-left">
                <h2 className="text-lg font-bold">Instant Camera</h2>
                <p className="text-sm">Capture Moments Instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
