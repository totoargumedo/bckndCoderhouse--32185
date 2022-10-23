import ContenedorArchivo from "./container/container.js";

const productos = new ContenedorArchivo("products");

const process = async () => {
  await productos.read();

  await productos.save({
    title: "mesa",
    price: 5300,
    thumbnail:
      "https://images.unsplash.com/photo-1594125674956-61a9b49c8ecc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  });

  await productos.save({
    title: "silla",
    price: 1800,
    thumbnail:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  });

  await productos.save({
    title: "lampara",
    price: 1100,
    thumbnail:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  });

  await productos.save({
    title: "sillon",
    price: 18000,
    thumbnail:
      "https://images.unsplash.com/photo-1579656381229-15bdb188da49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  });

  await productos.getById(7);
  await productos.getById(2);

  await productos.deleteById(9);
  await productos.deleteById(3);

  await productos.getAll();
};
process();
