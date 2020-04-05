const express = require("express");
const connection = require("../src/database/connection");
const crypto = require("crypto");

const routes = express.Router();

routes.get("/users", async (Request, Response) => {
  const users = await connection("users").select("*");
  return Response.json(users);
});

routes.post("/users", async (Request, Response) => {
  const { name, email } = Request.body;
  const id = crypto.randomBytes(4).toString('HEX');


  await connection("users").insert({
    id,
    name,
    email,
  });

  return Response.json({ id });
});

module.exports = routes;
