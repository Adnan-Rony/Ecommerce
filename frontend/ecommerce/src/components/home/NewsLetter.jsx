import React from "react";
import CountUp from "react-countup";
import { MdOutlineEmail } from "react-icons/md";

export const NewsLetter = () => {
  return (
    <div
      className="flex flex-col justify-center
     items-center space-y-8
     bg-gradient-to-r from-[#f6cece] to-[#e4efff]
      py-16 my-12
      "
    >
      <div
        className="flex flex-col justify-center items-center
      text-center
      space-y-4"
      >
        <p className="p-4 bg-gray-100 w-fit rounded-full">
          <MdOutlineEmail className="text-2xl" />
        </p>

        <h1 className="text-3xl font-bold ">Stay Updated with TechDev</h1>
        <p className="text-lg font-semibold opacity-80">
          Get the latest tech news, exclusive deals, and product launches
          delivered to your inbox
        </p>
      </div>
      {/* Subscribe */}
      <div className="space-x-2 flex">
        <input
          type="text"
          placeholder="Enter Your Email Address"
          className="input"
        />
        <button className="btn">Subscribe</button>
      </div>
      {/* stats */}
      <div className="mt-6 grid md:grid-cols-4 gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            <CountUp end={1000} enableScrollSpy scrollSpyOnce duration={10} />+
          </h2>
          <p className="text-sm opacity-75">Subscribers</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            <CountUp end={100} enableScrollSpy scrollSpyOnce duration={10} />+
          </h2>
          <p className="text-sm opacity-75">Newsletters Sent</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            <CountUp end={80} enableScrollSpy scrollSpyOnce duration={10} />+
          </h2>
          <p className="text-sm opacity-75">Product Launches</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            <CountUp end={98} enableScrollSpy scrollSpyOnce duration={10} />%
          </h2>
          <p className="text-sm opacity-75">Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
};
