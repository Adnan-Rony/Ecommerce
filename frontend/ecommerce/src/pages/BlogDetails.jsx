import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBlogById = async (id) => {
  const res = await axios.get(`https://devthroughts.vercel.app/api/v1/blogs/${id}`);
  return res.data; // Direct blog object
};

const BlogDetails = () => {
  const { id } = useParams();

  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: () => fetchBlogById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !blog) return <p>Something went wrong.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <div className="text-sm text-gray-500 mb-2">
        By {blog.author?.name || "Unknown Author"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      {/* Optional: Tags, Comments */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg">Tags</h2>
        <div className="flex gap-2 flex-wrap mt-2">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
