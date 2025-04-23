import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost } from "../../interfaces";
import postsApi from "../../services/posts";
import { Button, TextBox } from "devextreme-react";
import { motion, AnimatePresence } from "framer-motion";

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [comment, setComment] = useState<string>("");
  const [showReactions, setShowReactions] = useState(false);
  const reactionsList = [
    { type: "like", icon: "fa-thumbs-up", label: "Like", color: "#1877f2" }, // أزرق فيسبوك
    { type: "love", icon: "fa-heart", label: "Love", color: "#f02849" }, // أحمر
    { type: "haha", icon: "fa-face-smile", label: "Haha", color: "#f7b125" }, // أصفر
    { type: "angry", icon: "fa-face-angry", label: "Angry", color: "#e9710f" }, // برتقالي غامق
  ];

  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const currentIcon = reactionsList.find((r) => r.type === selectedReaction);
  const getPost = async (id: string) => {
    const res = await postsApi.getPost(id);
    setPost(res);
  };
  useEffect(() => {
    getPost(String(id));
  }, [id]);
  return (
    <>
      {post?.title}
      <br />
      {post?.content}
      <br />
      {post?.authorId}
      <div className="reacts" style={{ textAlign: "center" }}>
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
                  <>
                    <motion.i
                      key={reaction.type}
                      className={`fa-solid ${reaction.icon} fa-2x`}
                      onClick={() => setSelectedReaction(reaction.type)}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="commentForm">
        <form action="">
          <TextBox
            value={comment}
            onValueChanged={(e) => setComment(e.value)}
            placeholder="Comment"
          />
          <Button useSubmitBehavior>Send</Button>
        </form>
      </div>
      <div className="comments">
        <div className="comment" style={{ display: "flex" }}>
          <i className="fa-solid fa-user"></i>
          <p>Comment 1</p>
        </div>
      </div>
    </>
  );
};

export default Blog;
