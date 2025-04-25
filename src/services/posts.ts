import axios from "axios";

const postsApi = {
  getPosts: async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    return res.data;
  },

  getPost: async (id: string) => {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    return res.data;
  },
};

export default postsApi;
