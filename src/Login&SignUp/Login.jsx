import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="my-10">
      <div className="p-3 max-w-lg mx-auto w-96 ">
        <h1 className="text-3xl text-center font-semibold my-7 text-[#042b92]	">
          Đăng nhập
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {"Đăng nhập"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Chưa có tài khoản?</p>
          <Link to={"/signup"}>
            <span className="text-blue-700">Đăng kí ngay</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
