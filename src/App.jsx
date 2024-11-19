import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buyer from "./Buyer";
import Seller from "./Seller/Seller";
import Admin from "./Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/*"} element={<Buyer />}></Route>
        <Route path={"/seller/*"} element={<Seller />}></Route>
        <Route path={"/admin/*"} element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
