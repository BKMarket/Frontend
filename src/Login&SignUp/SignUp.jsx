import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login-SignUp.css'; // Import the CSS file for styling

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/login"); // Redirect to login page on submit
  };

  return (
    <div>
      <div className="banner">
        <h1 className="text-h1">Chào mừng đến với BK Market</h1>
        <h2 className="text-h2">Đăng nhập và bắt đầu hành trình của bạn với chúng tôi</h2>
      </div>
      <div className="container">
        <h1 className="title">Đăng kí</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Username"
            className="input"
            id="username"
            onChange={handleChange}
          />
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
          <button
            disabled={loading}
            className="button"
          >
            {loading ? "Loading..." : "Đăng kí"}
          </button>
        </form>
        <div className="footer">
          <p>Đã có tài khoản?</p>
          <Link to={"/login"}>
            <span className="link">Đăng nhập ngay</span>
          </Link>
        </div>
        {error && <p className="signup-error">{error}</p>}
      </div>
    </div>
  );
}
