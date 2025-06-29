import BlogCardSkeleton from "./BlogCardSkeleton.jsx";

const BlogSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 px-4  space-y-2">
      {[...Array(4)].map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default BlogSkeletonGrid;