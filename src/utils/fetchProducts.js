import axios from "axios";

const fetchProducts = async (setProducts, setFetched) => {
  try {
    const apiUrl = "https://scandiweb-walid.000webhostapp.com/";
    const response = await axios.get(apiUrl);
    setProducts(response.data);
    setFetched(true);
  } catch (err) {
    console.log(err);
  }
};

export default fetchProducts;
