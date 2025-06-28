import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "./BlogsApi.js";


export const UseFetchBlog = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
};
