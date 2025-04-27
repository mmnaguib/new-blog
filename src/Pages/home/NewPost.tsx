import {
  Button,
  FileUploader,
  Popup,
  SelectBox,
  TagBox,
  TextArea,
  TextBox,
} from "devextreme-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { availableTags } from "../../utils/data";
export const postTypes = [
  { ID: 1, type: "شخصي" },
  { ID: 2, type: "عام" },
  { ID: 3, type: "رياضي" },
];
const NewPost = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [image, setImage] = useState<File | string>("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  const [facebookProfile, setFacebookProfile] = useState<string>("");
  const navigate = useNavigate();
  const addNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type", type.toString());
    if (image) formData.append("image", image);
    formData.append("facebookProfile", facebookProfile);
    formData.append("tags", JSON.stringify(tags));
    formData.append("authorId", authorId);
    try {
      await axiosInstance.post("api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("newBlogToken")}`,
        },
      });
      setTitle("");
      setContent("");
      setImage("");
      setType("");
      setTags([]);
      setFacebookProfile("");
      navigate("/");
      toast.success("تم إضافة المنشور بنجاح");
    } catch (err) {
      console.error("Error uploading post:", err);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loginUserData") || "{}");
    setAuthorId(userData.id);
  }, []);
  return (
    <Popup
      visible={isOpen}
      onHiding={() => setIsOpen(false)}
      height={650}
      width={600}
      title="إضافة منشور جديد"
      rtlEnabled
    >
      <div className="addPostContainer">
        {/* <h2 className="pageHeader">إضافة منشور جديد</h2> */}
        <form onSubmit={addNewPost}>
          <div className="divContent">
            <label>عنوان المنشور</label>

            <TextBox value={title} onValueChanged={(e) => setTitle(e.value)} />
          </div>
          <div className="divContent">
            <label>محتوي المنشور</label>

            <TextArea
              value={content}
              onValueChanged={(e) => setContent(e.value)}
            />
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
          </div>

          <div className="divContent">
            <label>نوع المنشور</label>

            <SelectBox
              dataSource={postTypes}
              value={type}
              onValueChanged={(e) => setType(e.value)}
              valueExpr={"type"}
              displayExpr={"type"}
            />
          </div>

          {type === "شخصي" && (
            <div className="divContent">
              <label>لينك الفيس بوك</label>

              <TextBox
                value={facebookProfile}
                onValueChanged={(e) => setFacebookProfile(e.value)}
              />
            </div>
          )}
          <div className="divContent">
            <label>مقترحات</label>

            <TagBox
              items={availableTags}
              value={tags}
              onValueChanged={(e) => setTags(e.value)}
              acceptCustomValue={true}
              applyValueMode="useButtons"
              searchEnabled={true}
            />
          </div>
          <Button text="save" useSubmitBehavior type="success" />
        </form>
      </div>
    </Popup>
  );
};

export default NewPost;
