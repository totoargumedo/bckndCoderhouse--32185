import ContainerFile from "../container/container.js";

const productos = new ContainerFile("productos");

async function getProduct({ params }, res) {
  let findElement;
  if (params.id) {
    findElement = await productos.getById(params.id);
  } else {
    findElement = await productos.getAll();
  }
  res.status(200).json(findElement);
}

async function getProductRandom(req, res) {
  const getRandomElement = await productos.getRandom();
  res.status(200).render("product", { element: getRandomElement });
}

async function saveProduct({ body }, res) {
  const savedProduct = await productos.save(body);
  res.status(201).json(savedProduct);
}

async function deleteProduct({ params }, res) {
  const deletedProduct = await productos.deleteById(params.id);
  res
    .status(201)
    .json({ message: "Producto eliminado", id: deletedProduct.id });
}

async function modifyProduct({ body, params: { id } }, res) {
  const modifiedProduct = await productos.modifyById(id, body);
  res.status(201).json(modifiedProduct);
}

export {
  productos,
  getProduct,
  getProductRandom,
  saveProduct,
  deleteProduct,
  modifyProduct,
};
