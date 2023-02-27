import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";

const RouteSwitch = ({ products, setProducts }) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home products={products} setProducts={setProducts} />}
          />
          <Route
            path="/addproduct"
            element={
              <AddProduct products={products} setProducts={setProducts} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteSwitch;
