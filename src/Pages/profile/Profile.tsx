import { useCallback, useEffect, useState } from "react";
import { Button, FileUploader, TextBox } from "devextreme-react";
import { IProfile } from "../../interfaces";
import "./profile.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseURL } from "../../utils";
const Profile = () => {
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<File | string>("");
  const token = localStorage.getItem("newBlogToken");
  const profileDataFunc = useCallback(async () => {
    const res = await axiosInstance.get("api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProfileData(res.data);
  }, [token]);

  useEffect(() => {
    profileDataFunc();
  }, [profileDataFunc]);

  useEffect(() => {
    if (profileData) {
      setEditUserName(profileData.user.username);
      setEditUserEmail(profileData.user.email);
      setPhone(profileData.user.phone || "");
      setImage(profileData.user.image || "");
    }
  }, [profileData]);

  const editProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", editUserName);
    formData.append("email", editUserEmail);
    formData.append("phone", phone);
    if (image) formData.append("image", image);
    await axiosInstance.put("api/auth/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <div className="editProfileForm">
      <h2 className="pageHeader">تعديل بيانات المستخدم</h2>
      <form onSubmit={editProfile}>
        <div className="divContent">
          <label>اسم المستخدم</label>
          <TextBox
            value={editUserName}
            onValueChanged={(e) => setEditUserName(e.value)}
          />
        </div>
        <div className="divContent">
          <label>البريد الاكتروني</label>
          <TextBox
            mode="email"
            value={editUserEmail}
            onValueChanged={(e) => setEditUserEmail(e.value)}
          />
        </div>
        <div className="divContent">
          <label>رقم الهاتف</label>
          <TextBox
            mode="tel"
            value={phone}
            onValueChanged={(e) => setPhone(e.value)}
          />
        </div>
        <FileUploader
          accept="image/*"
          multiple={false}
          uploadMode="useForm"
          labelText="اختار صورة"
          selectButtonText="اختر ملف"
          onValueChanged={(e) => {
            if (e.value && e.value.length > 0) {
              const file = e.value[0];
              setImage(file);
            } else {
              console.log("لم يتم اختيار أي ملف");
            }
          }}
        />
        <img
          src={`${baseURL}/uploads/${image}`}
          width={80}
          height={80}
          alt="profile"
        />
        <Button type="success" useSubmitBehavior text="save" />
      </form>
    </div>
  );
};

export default Profile;
