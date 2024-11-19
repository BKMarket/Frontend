import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import './Login-SignUp.css'; // Import the CSS file for styling

export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>      
      <div className="banner">
        <h1 className="text-h1">Rất vui khi được gặp lại bạn</h1>
        <h2 className="text-h2">Welcome back</h2>
      </div>
      <div className="container">
        <h1 className="title">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Email"
            className="input"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            id="password"
            onChange={handleChange}
          />

          <button className="button">
            {"Đăng nhập"}
          </button>
        </form>
        <div className="footer">
          <p>Chưa có tài khoản?</p>
          <Link to={"/signup"}>
            <span className="link">Đăng kí ngay</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
