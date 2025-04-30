import { use, useEffect, useState } from "react";
import { IPost, IUser } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import PostCard from "../../components/PostCard";
import { Button } from "devextreme-react";
import EditBlog from "../home/EditBlog";
import { toast } from "react-toastify";
import EditProfile from "./EditProfile";

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const [isOpenUserEdit, setIsOpenUserEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const userData = JSON.parse(localStorage.getItem("loginUserData") || "{}");
  const profileDataFunc = async (userId: string) => {
    const res = await axiosInstance.get(`api/auth/user/${userId}`);
    setProfileData(res.data.user);
    setUserPosts(res.data.posts);
  };

  useEffect(() => {
    profileDataFunc(String(id));
  }, [id]);
  const handleEdit = (postId: string) => {
    setSelectedPostId(postId);
    setIsOpenUserEdit(true);
  };
  const handleDelete = async (postId: string) => {
    await axiosInstance.delete(`/api/posts/${postId}`);
    setUserPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== postId)
    );
    toast.success("تم حذف البوست بنجاح");
  };
  const navigate = useNavigate();
  return (
    <>
      <h2 className="pageHeader">بيانات المستخدم</h2>
      {profileData?.username}
      {userData.id === id && (
        <Button onClick={() => setIsOpen(true)} text="عدل بياناتك" />
      )}
      <div>
        {userPosts.map((post) => (
          <>
            <PostCard key={post._id} post={post} />
            {userData.id === id && (
              <>
                <Button icon="edit" onClick={() => handleEdit(post._id)} />
                <Button icon="trash" onClick={() => handleDelete(post._id)} />
              </>
            )}
          </>
        ))}
        <EditBlog
          isOpenEdit={isOpenUserEdit}
          setIsOpenEdit={setIsOpenUserEdit}
          editPost={selectedPostId}
        />
        <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default UserProfile;
