const deleteProducts = async (productsToDelete) => {
  try {
    const apiUrl = "https://scandiweb-walid.000webhostapp.com/delete";

    // Delete each product
    await productsToDelete.forEach(async (sku) => {
      await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ sku: sku }),
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export default deleteProducts;
