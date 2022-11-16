import express from "express";
import { routerProductos } from "./routers/products.js";
import { engine } from "express-handlebars";

// declaracion de server
const app = express();
const PORT = 8080;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static
app.use(express.static("public", { index: false }));

// views engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Routers
app.use("/api/productos", routerProductos);

// Endpoints;
app.get("/", (req, res) => {
  console.log(req.query.added);
  res.render("productForm", {
    productTitle: req.query.title,
    productImage: req.query.image,
    added: req.query.added,
  });
});

// Inicializacion de server
const server = app.listen(PORT, () => {
  console.log(`Server running in port ${server.address().port}`);
});

server.on("error", (error) =>
  console.log({ error: error, message: "Server error" })
);
