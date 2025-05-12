import React from "react";
import img from "../../assets/1328396.png";
const ReviewSection = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-2 grid-cols-1 gap-6">
        {/* Existing review */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
          <p className="text-sm text-gray-700 mb-1">
            1 review for <strong>iPhone 12 Pro Moment Case – Olive</strong>
          </p>
          <div className="flex items-start gap-4 my-4">
            <img src={img} alt="Reviewer" className="rounded-full w-12 h-12" />
            <div>
              <p className="font-semibold">
                Mr. Mackay{" "}
                <span className="text-sm text-gray-500">
                  — September 2, 2022
                </span>
              </p>
              <div className="flex space-x-1 text-yellow-500 text-sm mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>
              <p className="text-gray-700 text-sm">
                At worst the discussion is at least working towards the final
                goal of your site where questions about lorem ipsum don’t.
                Summing up, if the copy is diverting attention from the design
                it’s because it’. If the copy becomes distracting in the design
                then you are doing something wrong or they are discussing copy
                changes. It might be a bit annoying but you could tell them that
                that discussion would be best suited for another time.
              </p>
            </div>
          </div>
        </div>

        {/* Review form */}
        <form className="space-y-4">
          <h3 className="text-lg font-semibold">Add a review</h3>
          <p className="text-sm text-gray-600">
            Your email address will not be published. Required fields are marked{" "}
            <span className="text-red-500">*</span>
          </p>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium">
              Your rating <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-1 text-gray-400 text-lg">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className="hover:text-yellow-500"
                  >
                    ☆
                  </button>
                ))}
            </div>
          </div>

          {/* Review textarea */}
          <div>
            <label className="block text-sm font-medium">
              Your review <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border rounded-md p-2 mt-1 text-sm"
              rows="5"
            ></textarea>
          </div>

          {/* Name and Email */}
          <div>
            <label className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border rounded-md p-2 text-sm"
            />
          </div>

          {/* Checkbox */}
          <label className="inline-flex items-center text-sm">
            <input type="checkbox" className="mr-2" />
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
