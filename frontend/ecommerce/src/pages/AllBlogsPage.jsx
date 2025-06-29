
import { Link } from "react-router-dom";
import { UseFetchBlog } from "../features/blog/BlogQuery.js";
import BlogSkeletonGrid from "../components/loader/BlogSkeletonGrid.jsx";

const AllBlogsPage = () => {
  const { data: blogs = [], isLoading } = UseFetchBlog();
  const ecommerceBlogs = blogs.filter(
  (blog) =>
    blog.categories?.some((cat) => cat.toLowerCase() === "e-commerce ") ||
    blog.tags?.some((tag) => tag.toLowerCase().includes("e-commerce "))
);

  const topFourBlogs = ecommerceBlogs

  return (
    <div className="my-10 max-w-screen-xl  mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Latest Blogs</h2>
        <p className="text-gray-500">Explore recent blog posts from our writers</p>
      </div>
      {isLoading && (
        <div className="px-4">
          <BlogSkeletonGrid
           />
        </div>
      )}

      {!isLoading && blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-4">
          {topFourBlogs.map((blog, index) => (
            <Link key={index} to={`/blogs/${blog._id}`}>
              <div className="bg-white rounded-xl shadow-md  hover:shadow-xl transition-shadow duration-300 overflow-hidden lg:h-[510px] py-1">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full lg:h-56 object-center lg:object-cover "
                  />

                  <div className="p-4 space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {blog.tags?.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2">
                      {blog.title}
                    </h2>

                    {/* Author & Meta */}
                    <div className="text-sm text-gray-500 flex flex-wrap gap-4 items-center">
                      <p>{blog.author?.name || "Unknown Author"}</p>
                      <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                      <p>💬 {blog.comments?.length ?? 0}</p>
                    </div>

                    {/* Content Preview */}
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {blog.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
                    </p>

                    {/* Read More Button */}
                    <div>
                      <button className="btn btn-outline border-blue-200 text-blue-500 rounded-3xl hover:text-white hover:bg-[#1d4c9e]">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogsPage;
