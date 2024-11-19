import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import './header-footer.css'
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div>
          <Link to="/">
            <h1 className="header-logo">
              <img src={logo} alt="logo" className="logo-img" />
            </h1>
          </Link>
        </div>
        <div>
          <ul className="nav-list">
            <Link to="/">
              <li className="nav-item">Home</li>
            </Link>
            <Link to="/search">
              <li className="nav-item">Search</li>
            </Link>
            <Link to="/cart">
              <li className="nav-item">Shopping Cart</li>
            </Link>
            <Link to="/about">
              <li className="nav-item">About</li>
            </Link>
          </ul>
        </div>
        <div>
          <Link to="/login">
            <button className="login-button">Đăng nhập</button>
          </Link>
          <Link to="/admin" className="ml-10">
            <AdminPanelSettingsIcon className="text-[#042b92]"></AdminPanelSettingsIcon>
          </Link>
        </div>
      </div>
    </header>
  );
}
