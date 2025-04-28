import { useEffect, useState } from "react";
import { IUser } from "../../interfaces";
import axiosInstance from "../../utils/axiosInstance";
import { DataGrid, Column } from "devextreme-react/data-grid";
import { baseURL } from "../../utils";
import { Button } from "devextreme-react";

const UserGrid = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getAllUsers = async () => {
    const res = await axiosInstance.get("api/auth/users");
    console.log(res.data);
    setUsers(res.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = async (usrId: string) => {
    await axiosInstance.delete(`/api/auth/user/${usrId}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== usrId));
  };
  const editUserRole = async (usrId: string) => {
    await axiosInstance.put(`/api/auth/make-admin/${usrId}`);
    getAllUsers();
  };
  return (
    <>
      <DataGrid
        dataSource={users}
        showBorders={true}
        columnAutoWidth
        rtlEnabled
      >
        <Column
          dataField="username"
          caption="اسم المستخدم"
          alignment="center"
        />
        <Column
          dataField="email"
          caption="البريد الإلكتروني"
          alignment="center"
        />
        <Column dataField="role" caption="الدور" alignment="center" />
        <Column
          dataField="createdAt"
          caption="تاريخ الإنشاء"
          alignment="center"
          calculateCellValue={(rowData) => rowData.createdAt.split("T")[0]}
        />
        <Column dataField="phone" caption="رقم الهاتف" alignment="center" />
        <Column
          dataField="image"
          caption="الصورة الشخصية"
          alignment="center"
          cellRender={(e) => {
            return (
              <img
                src={`${baseURL}/uploads/` + e.data.image}
                alt="user"
                style={{ width: "50px", height: "50px" }}
              />
            );
          }}
        />
        <Column
          dataField="actions"
          caption="الإجراءات"
          width={250}
          cellRender={(rowData) => {
            return (
              <div className="flex space-x-2">
                <Button
                  onClick={() => deleteUser(`${rowData.data._id}`)}
                  type="danger"
                >
                  حذف
                </Button>
                <Button
                  onClick={() => editUserRole(`${rowData.data._id}`)}
                  type="default"
                  disabled={rowData.data.role == "admin"}
                >
                  تعديل دور المستخدم
                </Button>
              </div>
            );
          }}
        />
      </DataGrid>
    </>
  );
};

export default UserGrid;
