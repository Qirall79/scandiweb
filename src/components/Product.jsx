import { useState } from "react";

const Product = ({ product, setProductsToDelete, productsToDelete }) => {
  const [checked, setChecked] = useState(false);

  // Add checked product to products to delete
  const handleCheckbox = (e) => {
    const isChecked = Boolean(e.target.checked);
    const sku = e.target.dataset.sku.toLowerCase();
    let toDelete = productsToDelete;

    if (isChecked) {
      if (productsToDelete.includes(sku)) return;

      setProductsToDelete([...productsToDelete, sku]);
    } else {
      if (!productsToDelete.includes(sku)) return;
      toDelete = toDelete.filter((s) => s !== sku);
      setProductsToDelete([...toDelete]);
    }
    setChecked(!checked);
    return;
  };

  return (
    <div className="w-[250px] h-[250px] border-2 inline-block p-8">
      <p>{product.sku}</p>
      <p>{product.name}</p>
      <p>{product.price} $</p>

      {product.type === "book" ? (
        <p>Weight : {product.weight}KG </p>
      ) : product.type === "dvd" ? (
        <p>Size : {product.size}MB </p>
      ) : (
        <p>
          Dimensions : {`${product.height}x${product.width}x${product.length}`}
        </p>
      )}
      <input
        type="checkbox"
        checked={checked}
        data-sku={product.sku}
        className="delete-checkbox"
        onChange={handleCheckbox}
      />
    </div>
  );
};

export default Product;
