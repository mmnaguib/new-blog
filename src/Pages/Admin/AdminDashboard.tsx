import { Button, DataGrid, TabPanel } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { useNavigate } from "react-router-dom";
import { gridTabs } from "../../utils/data";
import PostsGrid from "./PostsGrid";
import UserGrid from "./UserGrid";

const AdminDashboard = () => {
  interface TabData {
    tabName: string;
  }
  const TabItem: React.FC<{ data: TabData }> = ({ data }) => {
    const tab = data;
    let content: JSX.Element | null = null;

    switch (tab.tabName) {
      case "البوستات":
        content = (
          <span>
            <PostsGrid />
          </span>
        );
        break;
      case "المستخدمين":
        content = (
          <span>
            <UserGrid />
          </span>
        );
        break;
      default:
        break;
    }

    return <>{content}</>;
  };

  const itemTitleRender = (tab: any) => {
    switch (tab.tabName) {
      case "posts":
        return (
          <span>
            {tab.tabName} <i className="fa-solid fa-people-group"></i>
          </span>
        );
      case "users":
        return (
          <span>
            {tab.tabName} <i className="fa-solid fa-user"></i>
          </span>
        );

      default:
        return <span>{tab.tabName}</span>;
    }
  };

  const navigate = useNavigate();
  return (
    <div className="p-4">
      <h2 className="pageHeader">لوحة تحكم الأدمن</h2>
      <TabPanel
        dataSource={gridTabs}
        itemComponent={TabItem}
        itemTitleRender={itemTitleRender}
      />
    </div>
  );
};

export default AdminDashboard;
