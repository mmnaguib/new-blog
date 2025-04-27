import React from "react";
import "./Sidebar.css";
import { RadioGroup } from "devextreme-react";
import { postTypes, sortPosts } from "../../utils/data";
const Sidebar = () => {
  const [selectedType, setSelectedType] = React.useState(1);
  const [sortPost, setSortPost] = React.useState(1);
  return (
    <div className="sidebar">
      <div>
        <label className="sidebar-label">اختر نوع المنشور</label>
        <RadioGroup
          dataSource={postTypes}
          defaultValue={selectedType}
          onValueChanged={(e) => setSelectedType(e.value)}
          layout="vertical"
          valueExpr="ID"
          displayExpr="type"
        />
      </div>
      <br />
      <div>
        <label className="sidebar-label">ترتيب المنشورات</label>
        <RadioGroup
          dataSource={sortPosts}
          defaultValue={sortPost}
          onValueChanged={(e) => setSortPost(e.value)}
          layout="vertical"
          valueExpr="ID"
          displayExpr="type"
        />
      </div>
    </div>
  );
};

export default Sidebar;
