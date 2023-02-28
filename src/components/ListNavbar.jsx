import { Link } from "react-router-dom";
import deleteProducts from "../utils/deleteProducts";

const ListNavbar = ({ productsToDelete, setProducts, products }) => {
  const handleDelete = async (e) => {
    e.preventDefault();

    // Do nothing if there are no products to delete
    if (!productsToDelete.length) return;

    // Delete products and update the products state
    deleteProducts(productsToDelete).then(() => {
      const updatedProducts = products.filter(
        (p) => !productsToDelete.includes(p.sku.toLowerCase())
      );
      setProducts([...updatedProducts]);
    });
  };

  return (
    <div className="p-10 bg-slate-500 flex justify-between items-center">
      <h1 className="text-3xl">Product List</h1>
      <ul className="flex gap-10">
        <li className="font-semibold">
          <Link to="/addproduct">ADD</Link>
        </li>
        <li className="font-semibold">
          <button id="delete-product-btn" onClick={handleDelete}>
            MASS DELETE
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListNavbar;
