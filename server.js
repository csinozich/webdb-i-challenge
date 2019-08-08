const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "error getting accounts", error: error });
  }
});

server.get("/api/accounts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [account] = await db("accounts").where({ id });
    if (account) {
      res.status(200).json(account);
    } else {
      res
        .status(404)
        .json({ message: "account with that id not found", error: error });
    }
  } catch (error) {
    res.status(500).json({ message: "error fetching account" });
  }
});

server.post("/api/accounts", async (req, res) => {
  const accountData = req.body;
  try {
    const account = await db("accounts").insert(accountData);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: "error adding account" });
  }
});

server.put("/api/accounts/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db("accounts")
      .where({ id })
      .update(changes);
    if (count) {
      res.status(200).json({ message: "successfully updated" });
    } else {
      res
        .status(404)
        .json({ message: "could not find an account with that id" });
    }
  } catch (error) {
    res.status(500).json({ message: "error updating account" });
  }
});

server.delete("/api/accounts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db("accounts")
      .where({ id })
      .del();
    if (deleted) {
      res.status(200).json({ message: "successfully deleted" });
    } else {
      res.status(404).json({ message: "could not find account with that id" });
    }
  } catch (error) {
    res.status(500).json({ message: "error deleting" });
  }
});

module.exports = server;
