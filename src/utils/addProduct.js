const addProduct = async (data) => {
  try {
    const apiUrl = "https://scandiweb-walid.000webhostapp.com/";

    await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
};

export default addProduct;
