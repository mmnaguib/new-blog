import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import "./home.css";
import { IPost } from "../../interfaces";
import postsApi from "../../services/posts";
import Sidebar from "../../components/sideBar/Sidebar";
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
    <>
      <div className="p-4">
        <Sidebar />
        <h2 className="pageHeader">أحدث المنشورات</h2>
        <div className="blogs-Containter">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
