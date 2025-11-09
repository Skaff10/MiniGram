const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT;
const { errorHandler } = require("./middlewares/error");
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));
app.use("/api/feed", require("./routes/feedRoutes"));
app.use("/api/comment", require("./routes/commentRoutes"));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`sup? I am listining to ${port}`.brightCyan.underline)
);
