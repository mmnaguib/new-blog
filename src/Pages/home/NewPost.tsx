import axios from "axios";
import {
  Button,
  DateBox,
  FileUploader,
  SelectBox,
  TagBox,
  TextArea,
  TextBox,
} from "devextreme-react";
import React, { useEffect, useState } from "react";

const NewPost = () => {
  const postTypes = [
    { ID: 1, type: "شخصي" },
    { ID: 2, type: "عام" },
    { ID: 3, type: "رياضي" },
  ];
  const availableTags = ["تقنية", "رياضة", "فن", "تعليم", "ترفيه"];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  //const [date, setDate] = useState("");
  const [image, setImage] = useState<File | string>("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  const [facebookProfile, setFacebookProfile] = useState<string>("");

  const addNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type", type.toString());
    if (image) formData.append("image", image);
    formData.append("facebookProfile", facebookProfile);
    formData.append("tags", JSON.stringify(tags)); // لازم تكون Array لو بتستخدمها
    formData.append("authorId", authorId);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("newBlogToken")}`,
          },
        }
      );

      console.log("Post Created ✅", res.data);
    } catch (err) {
      console.error("Error uploading post:", err);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loginUserData") || "{}");
    setAuthorId(userData.id);
  }, []);
  return (
    <>
      <form onSubmit={addNewPost}>
        <TextBox value={title} onValueChanged={(e) => setTitle(e.value)} />
        <TextArea value={content} onValueChanged={(e) => setContent(e.value)} />
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
        <TextBox
          value={facebookProfile}
          onValueChanged={(e) => setFacebookProfile(e.value)}
        />
        <SelectBox
          dataSource={postTypes}
          value={type}
          onValueChanged={(e) => setType(e.value)}
          valueExpr={"type"}
          displayExpr={"type"}
        />

        <TagBox
          items={availableTags}
          value={tags}
          onValueChanged={(e) => setTags(e.value)}
          acceptCustomValue={true}
          applyValueMode="useButtons"
          searchEnabled={true}
        />
        <Button text="save" useSubmitBehavior type="success" />
      </form>
    </>
  );
};

export default NewPost;
