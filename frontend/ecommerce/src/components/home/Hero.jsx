import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../assets/apple-shopping-event-banner.WEBP";
import img2 from "../../assets/discount-on-all-smart-appliances.WEBP";
import img3 from "../../assets/pre-order-g-pixel-7.WEBP";
import headset from "../../assets/instant-cameras.jpg";
import dualsense from "../../assets/new-dualsense.jpg";
import camera from "../../assets/logitech-aurora-headset-opt-760x312.jpg";

import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[460px]">
        {/* Left: Swiper Section */}
        <div className="h-full group overflow-hidden rounded-xl relative">
          <Swiper
            scrollbar={{ hide: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Scrollbar, Autoplay]}
            className="mySwiper h-full"
          >
            {[img1, img3, img2].map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <div
                    className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-110 rounded-xl"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4 h-full">
          {/* Top Card */}
          <div className="group relative h-full flex-1 rounded-xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${camera})` }}
            />
            <div className="absolute inset-0  z-10 rounded-xl" />
            <div className="relative z-20 p-4 text-white text-center sm:text-left">
              <h2 className="text-lg font-bold">Aurora Headset</h2>
              <p className="text-sm">Crystal Clear Sound</p>
              <button className=" bg-blue-500 text-white mt-4 btn px-3 py-1 rounded">
                View Details
              </button>
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
              <div className="absolute inset-0  z-10 rounded-xl" />
              <div className="relative z-20 p-4 text-white text-center sm:text-left">
                <h2 className="text-lg font-bold">New Dual Sense</h2>
                <p className="text-sm">For PlayStation 5</p>
                <button className="btn mt-4  rounded">
                  View Details
                </button>
              </div>
            </div>

            {/* Instant Camera */}
            <div className="group relative h-full rounded-xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${headset})` }}
              />
              <div className="absolute inset-0  z-10 rounded-xl" />
              <div className="relative z-20 p-4 text-white text-center sm:text-left">
                <h2 className="text-lg font-bold">Instant Camera</h2>
                <p className="text-sm">Capture Moments Instantly</p>
                <button className="btn  mt-4  rounded">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
