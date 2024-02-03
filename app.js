const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const { DB_HOST, PORT} = process.env;

const contactsRouter = require("./routes/contactsRouter.js");

const app = express();

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT)
    console.log("Database connected successfuly");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json()); //підключення парсеру жсон формату

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error", name } = err;
  res.status(status).json({ message });
});

