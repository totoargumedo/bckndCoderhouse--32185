import express from "express";
import { routerProductos } from "./routers/products.js";
import { routerChat } from "./routers/chat.js";
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
app.use("/api/chat", routerChat);

// Endpoints;
app.get("/", (req, res) => {
  res.render("productForm");
});

// socket
import { Server } from "socket.io";
import { createServer } from "http";
import { productos } from "./controllers/products.js";
import ContainerChat from "./container/containerChat.js";

const messages = new ContainerChat("chat");

const httpServer = new createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("User connected to socket");

  socket.emit("productTable", productos.getAll());

  socket.emit("messagesAll", messages.getAll());

  socket.on("newMessage", (data) => {
    messages.save(data);
    io.sockets.emit("messagesAll", messages.getAll());
  });
});

// Inicializacion de server
const server = httpServer.listen(PORT, () => {
  console.log(`Server running in port ${server.address().port}`);
});

server.on("error", (error) =>
  console.log({ error: error, message: "Server error" })
);
