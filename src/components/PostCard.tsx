import { IPost } from "../interfaces";
import FaceBook from "../assetst/facebook.jpeg";
import { useNavigate } from "react-router-dom";
import { Button } from "devextreme-react";
import axios from "axios";
import { useEffect, useState } from "react";

const PostCard = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const commentCount = async (postId: string) => {
    const res = await axios.get(
      `http://localhost:5000/api/comments/${postId}/count`
    );
    setCount(res.data.count);
  };
  useEffect(() => {
    commentCount(String(post._id));
  }, []);
  return (
    <>
      <div className="blog-content">
        <img
          className="charachter-image"
          src={`http://localhost:5000/uploads/${post.image}`}
          alt="charachter"
          width="100"
          height="100%"
        />
        <span className="blog-date">
          {new Date(post.date).toLocaleDateString("ar-EG")}
        </span>
        <span className="blog-title">
          {post.title.length > 30
            ? post.title.slice(0, 20) + "..."
            : post.title}
        </span>
        <span className="blog-paragraph">
          {post.content.length > 70
            ? post.content.slice(0, 70) + "..."
            : post.content}
        </span>
        <span>{post.reactions.length}</span> // {count}
        {post.content.length > 70 && (
          <Button
            text="READ MORE"
            type="outline"
            stylingMode="contained"
            onClick={() => navigate(`/${post._id}`)}
            className="blogButton"
          />
        )}
        {/* <span className="blog-author">{post.author}</span> */}
        <a href={post.facebookProfile} target="_blank" rel="noreferrer">
          <img
            className="facebookImage"
            src={FaceBook}
            width={30}
            height={30}
            alt="facebook logo"
          />
        </a>
      </div>
    </>
  );
};
export default PostCard;
