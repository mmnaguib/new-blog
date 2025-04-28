import { useEffect, useState } from "react";
import { IPost, IUser } from "../../interfaces";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import PostCard from "../../components/PostCard";
import { Button } from "devextreme-react";
import EditBlog from "../home/EditBlog";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const [isOpenUserEdit, setIsOpenUserEdit] = useState(false);
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
  return (
    <>
      <h2 className="pageHeader">بيانات المستخدم</h2>
      {profileData?.username}
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
      </div>
    </>
  );
};

export default UserProfile;
