import axios from "axios";

export const fetchBlogs = async () => {
  const res = await axios.get("https://devthroughts.vercel.app/api/v1/blogs");
  console.log(res.data); // inspect structure
  return res.data;
};
