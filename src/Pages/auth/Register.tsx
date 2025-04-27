import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useState } from "react";
import { Button, TextBox } from "devextreme-react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      username: username,
    };
    const res = await axiosInstance.post("api/auth/register", user);
    if (res.status === 201) {
      navigate("/login");
      setEmail("");
      setPassword("");
      setUsername("");
      toast.success("User registered successfully");
    } else {
      toast.error("Error registering user");
    }
  };
  return (
    <div className="login-content">
      <div className="login-container" style={{ margin: "auto" }}>
        <h2 className="formHeader">تسجيل الدخول</h2>
        <p className="formPara">
          نظام متكامل يعطيك التحكم الكامل في إدارة المقالات الخاصة بك.
        </p>
        <form className="login-form" onSubmit={handleRegister}>
          <div className="inputContent">
            <label>البريد الالكتروني</label>
            <TextBox
              value={email}
              onValueChanged={(e) => setEmail(e.value)}
              placeholder="اسم المستخدم"
              mode="email"
            />
          </div>
          <div className="inputContent">
            <label>كلمة المرور</label>
            <TextBox
              mode="password"
              value={password}
              onValueChanged={(e) => setPassword(e.value)}
              placeholder="كلمة المرور"
            />
          </div>
          <div className="inputContent">
            <label>اسم المستخدم</label>
            <TextBox
              value={username}
              onValueChanged={(e) => setUsername(e.value)}
              placeholder="اسم المستخدم"
            />
          </div>
          <Button
            type="success"
            useSubmitBehavior
            className="subimitBtn"
            width={150}
          >
            دخول
          </Button>
        </form>
        <Link type="success" className="registerBtn" to="/login">
          سجل دخول
        </Link>
      </div>
    </div>
  );
};

export default Register;
