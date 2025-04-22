import { Link } from "react-router-dom";
import "./login/login.css";
import { useState } from "react";
import { Button, TextBox } from "devextreme-react";
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
          <div className="inputContent">
            <label>اسم المستخدم</label>
            <TextBox
              value={username}
              onValueChanged={(e) => setUsername(e.value)}
              placeholder="اسم المستخدم"
            />
          </div>
          <Button useSubmitBehavior className="subimitBtn">
            دخول
          </Button>
        </form>
        <Link className="registerBtn" to="/login">
          سجل دخول
        </Link>
      </div>
    </div>
  );
};

export default Register;
