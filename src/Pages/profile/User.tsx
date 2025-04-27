import { useEffect, useState } from "react";
import { IUser } from "../../interfaces";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const profileDataFunc = async (userId: string) => {
    const res = await axiosInstance.get(`api/auth/user/${userId}`);
    setProfileData(res.data);
  };

  useEffect(() => {
    profileDataFunc(String(id));
  }, [id]);
  return (
    <>
      <h2 className="pageHeader">بيانات المستخدم</h2>
      {profileData?.username}
    </>
  );
};

export default UserProfile;
