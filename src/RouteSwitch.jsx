import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";

const RouteSwitch = ({ products, setProducts }) => {
  return (
    <div>
      <BrowserRouter basename="/scandiweb">
        <Routes>
          <Route path="/" element={<Home products={products} />} />
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