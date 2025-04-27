import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useState } from "react";
import { Button, TextBox } from "devextreme-react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    const res = await axiosInstance.post("api/auth/login", user);
    if (res.status === 200) {
      navigate("/");
      setEmail("");
      setPassword("");
      toast.success("User Login successfully");
      localStorage.setItem("newBlogToken", res.data.token);
      localStorage.setItem("loginUserData", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("login"));
    } else {
      toast.error("Error Login user");
    }
  };
  return (
    <div className="login-content">
      <div className="login-container" style={{ margin: "auto" }}>
        <h2 className="formHeader">تسجيل الدخول</h2>
        <p className="formPara">
          نظام متكامل يعطيك التحكم الكامل في إدارة المقالات الخاصة بك.
        </p>
        <form className="login-form" onSubmit={handleLogin}>
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
          <Button
            type="success"
            useSubmitBehavior
            className="subimitBtn"
            width={150}
          >
            دخول
          </Button>
        </form>
        <Link className="registerBtn" to="/register">
          أليس لديك حساب ؟
        </Link>
      </div>
    </div>
  );
};

export default Login;
