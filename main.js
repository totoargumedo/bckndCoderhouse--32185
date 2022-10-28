import ContenedorArchivo from "./container/container.js";
import express from "express";

// declaracion de server
const app = express();

const PORT = 8080;

// Instanciar contenedor de productos
const productos = new ContenedorArchivo("productos");

// Endpoints
app.get("/productos", (req, res) => {
  const getElements = productos.getAll();

  res.status(200).json(getElements);
});

app.get("/productoRandom", (req, res) => {
  const getRandomElement = productos.getRandom();
  res.status(200).json(getRandomElement);
});
// Inicializacion de server
const server = app.listen(PORT, () => {
  console.log(`Server running in port ${server.address().port}`);
});

server.on("error", (error) =>
  console.log({ error: error, message: "Server error" })
);
