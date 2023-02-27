import { useEffect, useState } from "react";
import fetchProducts from "./utils/fetchProducts";
import RouteSwitch from "./RouteSwitch";
// eslint-disable-next-line no-unused-vars
import styles from "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [fetched, setFetched] = useState(false);

  const getProducts = async () => {
    await fetchProducts(setProducts, setFetched, products);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fetched) {
    return (
      <div className="px-20 py-10 bg-slate-400 min-h-screen overflow-x-hidden">
        Please Wait...
      </div>
    );
  }

  return (
    <div className="px-20 py-10 bg-slate-400 min-h-screen overflow-x-hidden">
      <RouteSwitch products={products} setProducts={setProducts} />
    </div>
  );
}

export default App;
