import { Router } from "express";

export const routerChat = new Router();

routerChat.get("/", (req, res) => {
  res.status(200).render("chat");
});
