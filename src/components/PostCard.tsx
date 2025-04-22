import { IPost } from "../interfaces";
import FaceBook from "../assetst/facebook.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "devextreme-react";

const PostCard = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="blog-content">
        <img
          className="charachter-image"
          src={post.image}
          alt=""
          width="100"
          height="100%"
        />
        <span className="blog-date">{post.date}</span>
        <span className="blog-title">{post.title}</span>
        <span className="blog-paragraph">
          {post.content.length > 70
            ? post.content.slice(0, 70) + "..."
            : post.content}
        </span>
        {post.content.length > 70 && (
          <Button
            text="READ MORE"
            type="outline"
            stylingMode="contained"
            onClick={() => navigate(`/${post.id}`)}
            className="blogButton"
          />
        )}
        {/* <span className="blog-author">{post.author}</span> */}
        <a href={post.facebookProfile} target="_blank">
          <img
            className="facebookImage"
            src={FaceBook}
            width={30}
            height={30}
          />
        </a>
      </div>
    </>
  );
};
export default PostCard;
