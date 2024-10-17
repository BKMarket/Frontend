import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md flex justify-around px-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 w-[80%]">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <img src={logo} alt="logo" className="h-9" />
          </h1>
        </Link>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={""}
            onChange={(e) => e.preventDefault()}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/login">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Đăng nhập
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex items-center justify-center w-[10%] text-lg	">
        <Link to="/cart">
          <FaCartShopping className="text-[#042b92]" width={100} height={100} />
        </Link>
      </div>
    </header>
  );
}
