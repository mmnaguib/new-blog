import axios from "axios";

const postsApi = {
  getPosts: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },

  getPost: async (id: string) => {
    const res = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return res.data;
  },
};

export default postsApi;
