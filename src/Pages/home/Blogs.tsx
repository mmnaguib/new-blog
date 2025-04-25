import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import "./home.css";
import { IPost } from "../../interfaces";
import postsApi from "../../services/posts";
import axios from "axios";
const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const getAllPosts = async () => {
    const res = await postsApi.getPosts();
    setPosts(res);
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="p-4">
      <h2 className="pageTitle">أحدث البوستات</h2>
      <div className="blogs-Containter">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
