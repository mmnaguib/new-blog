import axiosInstance from "../utils/axiosInstance";

const postsApi = {
  getPosts: async () => {
    const res = await axiosInstance.get("api/posts");
    return res.data;
  },

  getPost: async (id: string) => {
    const res = await axiosInstance.get(`api/posts/${id}`);
    return res.data;
  },
};

export default postsApi;
