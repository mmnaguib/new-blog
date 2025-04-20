import PostCard from "../components/PostCard";
import { posts } from "../data/posts";

const Home = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">أحدث البوستات</h2>
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </div>
);

export default Home;
