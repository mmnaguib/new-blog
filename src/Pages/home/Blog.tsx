import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPost } from "../../interfaces";
import postsApi from "../../services/posts";
import { motion, AnimatePresence } from "framer-motion";
import Comments from "./Comments";
import axiosInstance from "../../utils/axiosInstance";

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showReactions, setShowReactions] = useState(false);

  const reactionsList = [
    { type: "like", icon: "fa-thumbs-up", label: "Like", color: "#1877f2" },
    { type: "love", icon: "fa-heart", label: "Love", color: "#f02849" },
    { type: "haha", icon: "fa-face-smile", label: "Haha", color: "#f7b125" },
    { type: "angry", icon: "fa-face-angry", label: "Angry", color: "#e9710f" },
  ];

  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const currentIcon = reactionsList.find((r) => r.type === selectedReaction);
  const userData = JSON.parse(localStorage.getItem("loginUserData") || "{}");

  const getPost = async (id: string) => {
    const res = await postsApi.getPost(id);
    setPost(res);

    const userReact = res.reactions.find((r: any) =>
      r.userIds.includes(userData.id)
    );

    if (userReact) {
      setSelectedReaction(userReact.type);
    } else {
      setSelectedReaction(null);
    }
  };

  const reactionCount = (type: string) => {
    return post?.reactions.filter((r) => r.type === type).length || 0;
  };

  useEffect(() => {
    getPost(id!);
  }, [id]);

  const handleReact = async (postId: string, type: string, userId: string) => {
    const newType = selectedReaction === type ? null : type;

    await axiosInstance.post(`api/reactions/${postId}/react`, {
      type,
      userId,
    });

    await getPost(postId);
    setSelectedReaction(newType);
  };

  console.log(post);
  return (
    <>
      {post?.title}
      <br />
      {post?.content}
      <br />
      {post?.authorId?.username}
      {localStorage.getItem("newBlogToken") ? (
        <>
          <div className="postAction">
            <div onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
              Comment
              <i className="fa-regular fa-comment fa-2x"></i>
            </div>
            <div
              className="reaction-container"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              {selectedReaction}
              <motion.i
                key={selectedReaction || "default"}
                className={`fa-solid ${
                  currentIcon ? currentIcon.icon : "fa-thumbs-up"
                } fa-2x main-icon`}
                style={{ color: currentIcon ? currentIcon.color : "#555" }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() =>
                  handleReact(String(post?._id), "like", userData.id)
                }
              />

              <AnimatePresence>
                {showReactions && (
                  <motion.div
                    className="reaction-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {reactionsList.map((reaction) => (
                      <div key={reaction.type}>
                        <motion.i
                          className={`fa-solid ${reaction.icon} fa-2x`}
                          style={{ color: reaction.color }}
                          onClick={() =>
                            handleReact(
                              String(post?._id),
                              reaction.type,
                              userData.id
                            )
                          }
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                        />
                        {reactionCount(reaction.type)}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <Comments isOpen={isOpen} setIsOpen={setIsOpen} id={id!} />
        </>
      ) : (
        <div className="loginToReact">
          <span>علشان تعمل رياكشن لازم تسجل دخول</span>
          <br /> <br />
          <Link to="/login">تسجيل دخول</Link>
        </div>
      )}
    </>
  );
};

export default Blog;
