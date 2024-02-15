const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const { DB_HOST, PORT } = process.env;

const contactsRouter = require("./routes/contactsRouter.js");
const userRouter = require("./routes/userRouter");

const app = express();

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connected successfuly");
  })
  .catch((err) => {
    console.log("error from app", err.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json()); //підключення парсеру жсон формату

app.use(express.static("public"))

//endpoints
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter)

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
