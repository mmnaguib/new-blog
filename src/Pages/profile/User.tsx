import axios from "axios";
import React, { useEffect, useState } from "react";
import { IProfile, IUser } from "../../interfaces";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const profileDataFunc = async (userId: string) => {
    const res = await axios.get(
      `http://localhost:5000/api/auth/user/${userId}`
    );
    setProfileData(res.data);
  };

  useEffect(() => {
    profileDataFunc(String(id));
  }, []);
  return <div>{profileData?.username}</div>;
};

export default UserProfile;
