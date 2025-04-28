import { Button, Popup, TextBox } from "devextreme-react";
import { useEffect, useState } from "react";
import { IComment } from "../../interfaces";
import { baseURL, getTimeDifference } from "../../utils";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export interface IProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  id: string;
}
const Comments = ({ isOpen, setIsOpen, id }: IProps) => {
  const userData = JSON.parse(localStorage.getItem("loginUserData") || "{}");

  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const getAllComments = async (postId: string) => {
    const res = await axiosInstance.get(`api/comments/${postId}`);
    setComments(res.data);
  };

  useEffect(() => {
    getAllComments(id!);
  }, [id]);

  const addComment = async (
    postId: string,
    comment: string,
    userId: string
  ) => {
    await axiosInstance.post(`api/comments/${postId}`, {
      content: comment,
      userId: userId,
    });
    setComment("");
    await getAllComments(id!);
  };

  const handleEdit = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const saveEdit = async (commentId: string) => {
    await axiosInstance.put(`api/comments/${commentId}`, {
      content: editedContent,
    });
    setEditingCommentId(null);
    setEditedContent("");
    await getAllComments(id!);
  };

  const handleDelete = async (commentId: string) => {
    await axiosInstance.delete(`api/comments/${commentId}`);
    await getAllComments(id!);
  };

  return (
    <div className="commentsContainer">
      <Popup
        visible={isOpen}
        onHiding={() => setIsOpen(false)}
        width={300}
        height={500}
        title="التعليقات"
        rtlEnabled
      >
        <div className="comments">
          {comments.map((c) => (
            <>
              <div className="comment" key={c._id}>
                {c.userId.image ? (
                  <img
                    src={`${baseURL}/uploads/${c.userId.image}`}
                    className="userImage"
                    alt="User"
                  />
                ) : (
                  <i className="fa-solid fa-user userImage"></i>
                )}

                {editingCommentId === c._id ? (
                  <>
                    <TextBox
                      value={editedContent}
                      onValueChanged={(e) => setEditedContent(e.value)}
                      placeholder="Edit comment"
                    />
                    <Button
                      text="Save"
                      onClick={() => saveEdit(String(c._id))}
                    />
                    <Button
                      text="Cancel"
                      onClick={() => setEditingCommentId(null)}
                    />
                  </>
                ) : (
                  <>
                    <div className="userComment">
                      <Link to={`/profile/${c.userId._id}`}>
                        {c.userId.username}
                      </Link>
                      <p style={{ margin: 0 }}>{c.content}</p>
                    </div>
                    <div className="dateAndActions">
                      <span>{getTimeDifference(c.date)}</span>
                      {userData.id === c.userId._id && (
                        <>
                          <Button
                            icon="edit"
                            onClick={() => handleEdit(String(c._id), c.content)}
                            className="actionBtn"
                            type="default"
                          />
                          <Button
                            icon="trash"
                            onClick={() => handleDelete(String(c._id))}
                            className="actionBtn"
                            type="danger"
                          />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              <br />
            </>
          ))}
        </div>

        <div className="commentForm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComment(id!, comment, userData.id);
            }}
          >
            <TextBox
              value={comment}
              onValueChanged={(e) => setComment(e.value)}
              placeholder="Comment"
            />
            <Button
              useSubmitBehavior
              disabled={!comment.length}
              type="success"
              icon="send"
            />
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default Comments;
