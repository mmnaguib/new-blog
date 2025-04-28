import { IPost } from "../interfaces";
import FaceBook from "../assetst/facebook.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "devextreme-react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { baseURL } from "../utils";

const PostCard = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const commentCount = async (postId: string) => {
    const res = await axiosInstance.get(`api/comments/${postId}/count`);
    setCount(res.data.count);
  };
  useEffect(() => {
    commentCount(String(post._id));
  }, [post._id]);
  return (
    <>
      <div className="blog-content">
        <img
          className="charachter-image"
          src={`${baseURL}/uploads/${post.image}`}
          alt="charachter"
          width="100"
          height="100%"
        />
        <span className="blog-date">
          {new Date(post.date).toLocaleDateString("ar-EG")}
        </span>
        <Link to={`/${post._id}`} className="blog-title">
          {post.title.length > 30
            ? post.title.slice(0, 20) + "..."
            : post.title}
        </Link>
        <span className="blog-paragraph">
          {post.content.length > 70
            ? post.content.slice(0, 70) + "..."
            : post.content}
        </span>
        <div className="blog-reactions">
          <span style={{ borderRadius: "0 25px 25px 0" }}>
            <i className="fa-solid fa-comment"></i>
            {post.reactions.length}
          </span>
          <span style={{ borderRadius: "25px 0 0 25px" }}>
            <i className="fa-solid fa-thumbs-up"></i>
            {count}
          </span>
        </div>
        {post.content.length > 70 && (
          <Button
            text="READ MORE"
            type="outline"
            stylingMode="contained"
            onClick={() => navigate(`/${post._id}`)}
            className="blogButton"
          />
        )}
        {post.type === "شخصي" && (
          <a href={post.facebookProfile} target="_blank" rel="noreferrer">
            <img
              className="facebookImage"
              src={FaceBook}
              width={30}
              height={30}
              alt="facebook logo"
            />
          </a>
        )}
      </div>
    </>
  );
};
export default PostCard;
