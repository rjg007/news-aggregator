const db = require("./db");
const { v4: uuidv4 } = require("uuid");

function register(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  //   console.log(db.users, "yellos");
  const user = db.find((item) => item.username === username);
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  //   const hash = hashPassword(password);
  const newUser = {
    id: uuidv4(),
    username,
    password: password,
  };
  db.push(newUser);
  //   db.users[username] = newUser;
  //   const token = createToken(newUser);
  return res.json({ id: newUser.id, username: newUser.username });
}

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const userInDB = db.users[username];
  if (!(userInDB && isPasswordCorrect(password, userInDB.password))) {
    return res.status(401).json({ error: "Invalid username or password!" });
  }

  const token = createToken(userInDB);
  res.json({ id: userInDB.id, username: userInDB.username, token });
}

module.exports = {
  register,
  login,
};
