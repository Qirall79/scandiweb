import { useState } from "react";
import ListNavbar from "../components/ListNavbar";
import Product from "../components/Product";
import Footer from "../components/Footer";

const Home = ({ products, setProducts }) => {
  const [productsToDelete, setProductsToDelete] = useState([]);

  return (
    <div className="w-full min-h-[90vh] h-full flex flex-col justify-between">
      <div>
        <ListNavbar
          productsToDelete={productsToDelete}
          setProducts={setProducts}
          products={products}
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pt-10"
          id="container"
        >
          {!products.length ? (
            <p>There are no products available.</p>
          ) : (
            products.map((product) => {
              return (
                <Product
                  key={product.sku}
                  product={product}
                  setProductsToDelete={setProductsToDelete}
                  productsToDelete={productsToDelete}
                />
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
