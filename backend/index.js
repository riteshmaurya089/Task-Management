const express = require("express");
const cors = require("cors");

const { connection, PORT } = require("./config/db");
const { userRouter } = require("./routes/UserRoutes");
const { taskRouter } = require("./routes/TaskRoutes");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.json({ message: "Server is running!"});
});


app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DataBase");
  } catch (error) {
    console.log(`${error} is giving while connecting`);
  }
  console.log(`Listening on PORT: ${PORT}`);
});