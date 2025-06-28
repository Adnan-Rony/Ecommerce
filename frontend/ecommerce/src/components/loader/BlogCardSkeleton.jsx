const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse overflow-hidden ">
      {/* Image */}
      <div className="w-full lg:h-56 bg-gray-200 rounded-xl" />

      <div className="p-4 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="h-5 w-16 bg-gray-200 skeleton rounded-full" />
          <span className="h-5 w-14 bg-gray-200 skeleton rounded-full" />
          <span className="h-5 w-20 bg-gray-200 skeleton rounded-full" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 skeleton rounded" />
        <div className="h-5 w-1/2 bg-gray-200 skeleton rounded" />

        {/* Author & Meta */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="h-4 w-20 bg-gray-200 skeleton rounded" />
          <div className="h-4 w-16 bg-gray-200 skeleton rounded" />
          <div className="h-4 w-12 bg-gray-200 skeleton rounded" />
        </div>

        {/* Content Preview */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 skeleton rounded" />
          <div className="h-4 w-5/6 bg-gray-200 skeleton rounded" />
          <div className="h-4 w-2/3 bg-gray-200 skeleton rounded" />
        </div>

        {/* Button */}
        <div className="h-8 w-24 bg-gray-200 rounded-3xl" />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
