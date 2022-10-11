import Product from "./container/products.js";

const productos = new Product();

productos.save({
  title: "mesa",
  price: 5300,
  thumbnail:
    "https://images.unsplash.com/photo-1594125674956-61a9b49c8ecc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
});

productos.save({
  title: "silla",
  price: 1800,
  thumbnail:
    "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
});

productos.save({
  title: "lampara",
  price: 1100,
  thumbnail:
    "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
});

productos.save({
  title: "sillon",
  price: 18000,
  thumbnail:
    "https://images.unsplash.com/photo-1579656381229-15bdb188da49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
});

console.log(productos.getById(7));
console.log(productos.getById(2));

productos.deleteById(9);
productos.deleteById(3);

console.log(productos.getAll());
