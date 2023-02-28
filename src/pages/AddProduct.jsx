import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import addProduct from "../utils/addProduct";
import fetchProducts from "../utils/fetchProducts";

const AddProduct = ({ products, setProducts }) => {
  const [productType, setProductType] = useState("book");
  const [added, setAdded] = useState(false);

  // Update UI based on product type
  const handleTypeChange = (e) => {
    const type = e.target.value;

    setProductType(type);
  };

  const validateData = (data) => {
    const skuError = document.querySelector("#sku-error");
    const nameError = document.querySelector("#name-error");
    const priceError = document.querySelector("#price-error");
    const dimensionError = document.querySelector("#dimension-error");
    const sizeError = document.querySelector("#size-error");
    const weightError = document.querySelector("#weight-error");

    // result
    let isValid = true;

    // Reset errors
    skuError.innerText = "";
    nameError.innerText = "";
    priceError.innerText = "";
    dimensionError.innerText = "";
    weightError.innerText = "";
    sizeError.innerText = "";

    // validate sku
    if (!data.sku.length) {
      skuError.innerText = "Invalid SKU, please provide a positive integer.";
      isValid = false;
    }
    const filtered = products.filter(
      (product) => product.sku.toLowerCase() === data.sku.toLowerCase()
    );

    if (filtered.length) {
      skuError.innerText = "SKU already exists.";
      isValid = false;
    }

    // validate name
    if (data.name.length < 1) {
      nameError.innerText = "Please provide a name.";
      isValid = false;
    }

    // validate price
    if (data.price <= 0) {
      priceError.innerText = "Please provide a valid price.";
      isValid = false;
    }

    // validate dimensions
    if (
      data.type === "furniture" &&
      (data.height <= 0 || data.width <= 0 || data.length <= 0)
    ) {
      dimensionError.innerText = "Invalid dimensions.";
      isValid = false;
    }

    // validate size
    if (data.type === "dvd" && data.size <= 0) {
      sizeError.innerText = "Please provide a valid size.";
      isValid = false;
    }

    // validate weight
    if (data.type === "book" && data.weight <= 0) {
      weightError.innerText = "Please provide a valid weight.";
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sku = document.querySelector("#sku").value;
    const name = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    const type = document.querySelector("#productType").value;

    // Add necessary data
    const data = {
      sku: sku,
      name,
      price: parseFloat(price),
      type,
    };

    // Add attributes based on type
    if (type === "book") {
      const weight = document.querySelector("#weight").value;
      data.weight = weight;
    }
    if (type === "dvd") {
      const size = document.querySelector("#size").value;
      data.size = size;
    }
    if (type === "furniture") {
      const height = document.querySelector("#height").value;
      const width = document.querySelector("#width").value;
      const length = document.querySelector("#length").value;
      data.height = height;
      data.width = width;
      data.length = length;
    }

    const validationResult = validateData(data);

    if (!validationResult) {
      return;
    }

    // Add product and re-fetch data to update UI
    await addProduct(data);
    await fetchProducts(setProducts, setAdded);
    return;
  };

  // Redirect to home after product is added
  if (added) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="">
      <div className="p-10 bg-slate-500 flex justify-between items-center">
        <h1 className="text-3xl">Product Add</h1>
        <ul className="flex gap-10">
          <li className="font-semibold">
            <button onClick={handleSubmit}>Save</button>
          </li>
          <li className="font-semibold">
            <Link to={"/"}>Cancel</Link>
          </li>
        </ul>
      </div>

      <div className="p-10">
        <form
          className="flex flex-col gap-8 w-1/2"
          id="product_form"
          method="post"
        >
          <div className="form-group flex flex-col gap-3">
            <div className="flex gap-5 justify-between">
              <label htmlFor="sku">SKU</label>
              <input
                className="w-[80%] h-8 outline-none px-2"
                type="text"
                name="sku"
                id="sku"
              />
            </div>
            <p id="sku-error" className="text-red-600 text-sm font-medium"></p>
          </div>

          <div className="form-group flex flex-col gap-3">
            <div className="flex gap-5 justify-between">
              <label htmlFor="name">Name</label>
              <input
                className="w-[80%] h-8 outline-none px-2"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <p id="name-error" className="text-red-600 text-sm font-medium"></p>
          </div>

          <div className="form-group flex flex-col gap-3">
            <div className="w-full flex gap-5 justify-between">
              <label htmlFor="price">Price ($)</label>
              <input
                className="w-[80%] h-8 outline-none px-2"
                type="number"
                min="0"
                name="price"
                id="price"
              />
            </div>
            <p
              id="price-error"
              className="text-red-600 text-sm font-medium"
            ></p>
          </div>
          <div className="form-group flex gap-5 justify-between">
            <label htmlFor="productType">Type Switcher</label>
            <select
              onChange={handleTypeChange}
              className="w-[80%] outline-none"
              name="type"
              id="productType"
            >
              <option value="book" id="Book">
                Book
              </option>
              <option value="dvd" id="DVD">
                DVD
              </option>
              <option value="furniture" id="Furniture">
                Furniture
              </option>
            </select>
          </div>

          <div
            className={`form-group ${
              productType === "dvd" ? "flex" : "hidden"
            } flex-col gap-3 justify-between`}
          >
            <div className="flex gap-5 justify-between">
              <label htmlFor="size">Size (MB)</label>
              <input
                className="w-[80%] h-8 outline-none px-2"
                type="number"
                min="0"
                name="size"
                id="size"
              />
            </div>

            <p id="size-error" className="text-red-600 text-sm font-medium"></p>
            <p className="text-sm font-medium text-green-600 ">
              *Please specify the size of your DVD disk
            </p>
          </div>

          <div
            className={`form-group ${
              productType === "book" ? "flex" : "hidden"
            } flex-col gap-3 justify-between`}
          >
            <div className="flex gap-5 justify-between">
              <label htmlFor="weight">Weight (KG)</label>
              <input
                className="w-[80%] h-8 outline-none px-2"
                type="number"
                min="0"
                name="weight"
                id="weight"
              />
            </div>
            <p
              id="weight-error"
              className="text-red-600 text-sm font-medium"
            ></p>
            <p className="text-sm font-medium text-green-600 ">
              *Please specify the weight of your book
            </p>
          </div>

          <div
            className={`form-group ${
              productType === "furniture" ? "flex" : "hidden"
            } flex-col gap-8`}
          >
            <div className="w-full flex gap-5 justify-between">
              <label htmlFor="height">Height</label>
              <input
                className="w-[80%] h-8 outline-none px-2"
                type="number"
                min="0"
                name="height"
                id="height"
              />
            </div>
            <div className="w-full flex gap-5 justify-between">
              <label htmlFor="width">Width</label>
              <input
                className="w-[80%] h-8 outline-none px-2"
                type="number"
                min="0"
                name="width"
                id="width"
              />
            </div>

            <div className="w-full flex gap-5 justify-between">
              <label htmlFor="length">Length</label>
              <input
                className="w-[80%] h-8 outline-none px-2"
                type="number"
                min="0"
                name="length"
                id="length"
              />
            </div>
            <p
              id="dimension-error"
              className="text-red-600 text-sm font-medium"
            ></p>
            <p className="text-sm font-medium text-green-600 ">
              *Please specify the dimensions of your furniture
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
