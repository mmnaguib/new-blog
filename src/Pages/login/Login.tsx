import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { Button, TextBox } from "devextreme-react";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          <Button useSubmitBehavior className="subimitBtn">
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
