import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { RadioGroup, TextBox } from "devextreme-react";
import { postTypes, sortPosts } from "../../utils/data";
import { IPost } from "../../interfaces";

const Sidebar = ({
  setPosts,
  allPosts,
}: {
  setPosts: any;
  allPosts: IPost[];
}) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [sortPost, setSortPost] = useState<number | string>("");
  const [search, setSearch] = useState<string>("");

  const filterAndSortPosts = (
    searchValue: string,
    type: string,
    sort: number | string
  ) => {
    let filteredPosts = [...allPosts];

    if (searchValue) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (type && type !== "الكل") {
      filteredPosts = filteredPosts.filter((post) => post.type === type);
    }

    if (sort === 1) {
      filteredPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sort === 2) {
      filteredPosts.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    setPosts(filteredPosts);
  };

  const handleSearch = (e: any) => {
    const searchValue = e.component.option("value");
    setSearch(searchValue);
    filterAndSortPosts(searchValue, selectedType, sortPost);
  };

  const handleTypeChange = (e: any) => {
    const selected = e.value;
    setSelectedType(selected);
    filterAndSortPosts(search, selected, sortPost);
  };

  const handleSortPost = (e: any) => {
    const selected = e.value;
    setSortPost(selected);
    filterAndSortPosts(search, selectedType, selected);
  };

  return (
    <div className="sidebar">
      <TextBox
        value={search}
        onValueChanged={handleSearch}
        valueChangeEvent="input" // عشان يبدأ أول ما تكتب
        placeholder="ابحث عن منشور"
      />
      <div>
        <label className="sidebar-label">اختر نوع المنشور</label>
        <RadioGroup
          dataSource={postTypes}
          value={selectedType}
          onValueChanged={handleTypeChange}
          layout="vertical"
          valueExpr="type"
          displayExpr="type"
        />
      </div>
      <br />
      <div>
        <label className="sidebar-label">ترتيب المنشورات</label>
        <RadioGroup
          dataSource={sortPosts}
          value={sortPost}
          onValueChanged={handleSortPost}
          layout="vertical"
          valueExpr="ID"
          displayExpr="sort"
        />
      </div>
    </div>
  );
};

export default Sidebar;
