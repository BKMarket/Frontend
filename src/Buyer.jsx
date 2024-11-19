import Footer from "./header_footer/Footer";
import Header from "./header_footer/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Login from "./Login&SignUp/Login";
import SignUp from "./Login&SignUp/SignUp";
import Search from "./Search/Search";
import ShoppingCart from "./Cart/Cart";
import Listing from "./Search/ListingSite";

function Buyer() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/cart" element={<ShoppingCart />}></Route>
        <Route path="/listing/:listingId" element={<Listing />}></Route>
      </Routes>
      <Footer />
    </>
  );
}


export default Buyer;
