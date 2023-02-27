import deleteProducts from "../utils/deleteProducts";

const ListNavbar = ({ productsToDelete, setFetched, setProducts }) => {
  const handleDelete = async () => {
    deleteProducts(productsToDelete).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="p-10 bg-slate-500 flex justify-between items-center">
      <h1 className="text-3xl">Product List</h1>
      <ul className="flex gap-10">
        <li className="font-semibold">
          <a href="/addproduct">ADD</a>
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
