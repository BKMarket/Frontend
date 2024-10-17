import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buyer from "./Buyer";
import Seller from "./Seller/Seller";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Buyer />}></Route>
        <Route path={"/seller/*"} element={<Seller />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
