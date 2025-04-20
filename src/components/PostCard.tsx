import { IPost } from "../interfaces";

const PostCard = ({ post }: { post: IPost }) => (
  <div className="post-card">
    <h2>{post.title}</h2>
    <p>{post.content}</p>
    <small>
      بواسطة {post.author} - {post.date}
    </small>
  </div>
);
export default PostCard;
