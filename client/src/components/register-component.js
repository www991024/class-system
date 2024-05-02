import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const history = useHistory();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功，您將轉至登入頁面");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">姓名</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子郵件</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">身份</label>
          <select
            onChange={handleChangeRole}
            className="form-control"
            name="role"
          >
            <option value="" disabled selected>
              請選擇一個身份
            </option>
            <option value="instructor">教師</option>
            <option value="student">學生</option>
          </select>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>註冊</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
