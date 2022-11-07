import express from "express";
import { routerProductos } from "./routers/products.js";

// declaracion de server
const app = express();
const PORT = 8080;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static
app.use(express.static("public"));

// Routers
app.use("/api/productos", routerProductos);

// Endpoints
// app.get("/", (req, res) => {
//   res.send("HOLO");
// });

// Inicializacion de server
const server = app.listen(PORT, () => {
  console.log(`Server running in port ${server.address().port}`);
});

server.on("error", (error) =>
  console.log({ error: error, message: "Server error" })
);
