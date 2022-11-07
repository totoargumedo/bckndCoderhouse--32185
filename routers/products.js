import { Router } from "express";
import {
  getProduct,
  getProductRandom,
  saveProduct,
  deleteProduct,
  modifyProduct,
} from "../controllers/products.js";

export const routerProductos = new Router();

routerProductos.get("/", getProduct);
routerProductos.get("/random", getProductRandom);
routerProductos.get("/:id", getProduct);
routerProductos.post("/", saveProduct);
routerProductos.put("/:id", modifyProduct);
routerProductos.delete("/:id", deleteProduct);
