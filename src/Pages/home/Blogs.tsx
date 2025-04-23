import PostCard from "../../components/PostCard";
import { posts } from "../../data/posts";
import "./home.css";
const Home = () => (
  <div className="p-4">
    <h2 className="pageTitle">أحدث البوستات</h2>
    <div className="blogs-Containter">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </div>
);

export default Home;
