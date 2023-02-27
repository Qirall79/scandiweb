const deleteProducts = async (productsToDelete) => {
  console.log(productsToDelete);
  try {
    

    const apiUrl = "https://scandiweb-walid.000webhostapp.com/delete";
    await productsToDelete.forEach(async (sku) => {
      await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ sku: sku }),
      });
    });
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};

export default deleteProducts;
