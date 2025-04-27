import { Button } from "devextreme-react";
import DataGrid, { Column } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { IPost } from "../../interfaces";
import postsApi from "../../services/posts";
import { gridTabs } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import NewPost from "../home/NewPost";
import EditBlog from "../home/EditBlog";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const PostsGrid = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editPost, setEditPost] = useState("");
  const navigate = useNavigate();

  const getAllPosts = async () => {
    const res = await postsApi.getPosts();
    setPosts(res);
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  const handlePostEdit = (val: string) => {
    setEditPost(val);
    setIsOpen(true);
  };

  const deletePost = async (val: string) => {
    await axiosInstance.delete(`/api/posts/${val}`);
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== val));
    toast.success("تم حذف البوست بنجاح");
  };
  return (
    <>
      <Button
        type="success"
        onClick={() => setIsOpen(true)}
        icon="plus"
        text="إضافة بوست جديد"
        style={{ margin: "20px 10px" }}
      />
      <DataGrid
        dataSource={posts}
        showBorders={true}
        columnAutoWidth
        rtlEnabled
      >
        <Column
          dataField="title"
          caption="عنوان البوست"
          width={250}
          alignment="center"
        />
        <Column
          dataField="content"
          caption="وصف البوست"
          width={250}
          alignment="center"
        />
        <Column
          dataField="image"
          caption="صورة البوست"
          width={250}
          alignment="center"
        />
        <Column
          dataField="date"
          caption="تاريخ الإنشاء"
          width={250}
          alignment="center"
        />
        <Column
          dataField="type"
          caption="نوع البوست"
          width={250}
          alignment="center"
        />
        <Column
          dataField="authorId.username"
          caption="اسم الكاتب"
          width={250}
          alignment="center"
        />
        <Column
          dataField="facebookProfile"
          caption="رابط الفيسبوك"
          width={250}
          alignment="center"
        />
        <Column
          dataField="tags"
          caption="الوسوم"
          width={250}
          alignment="center"
        />
        <Column
          dataField="comments.length"
          caption="عدد التعليقات"
          width={250}
          alignment="center"
        />
        <Column
          dataField="reactions.length"
          caption="عدد التفاعلات"
          width={250}
          alignment="center"
        />
        <Column
          dataField="actions"
          caption="الإجراءات"
          width={250}
          cellRender={(rowData) => {
            return (
              <div className="flex space-x-2">
                <Button
                  onClick={() => handlePostEdit(rowData.data._id)}
                  type="default"
                >
                  تعديل
                </Button>
                <Button
                  onClick={() => deletePost(`${rowData.data._id}`)}
                  type="danger"
                >
                  حذف
                </Button>
              </div>
            );
          }}
        />
      </DataGrid>

      <NewPost isOpen={isOpen} setIsOpen={setIsOpen} />
      <EditBlog
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        editPost={editPost}
      />
    </>
  );
};

export default PostsGrid;
