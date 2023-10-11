const express = require("express");
const { register, login } = require("./routes");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", register);
app.post("/login", login);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Something went wrong while starting the server");
  } else {
    console.log("Server is running on port 3000");
  }
});
