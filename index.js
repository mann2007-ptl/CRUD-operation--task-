const express = require("express");

const app = express();
app.use(express.json());

const users = [
  {att:80 , uid : 108243 , total_sub : 14 , bonus : 20 , name : "Dax"},
  {att:85 , uid : 108244 , total_sub : 18 , bonus : 25 , name : "Hanuman"},
  {att:70 , uid : 108245 , total_sub : 12 , bonus : 15 , name : "Manan"}
]

app.get("/users", (req ,  res)=>{
    res.status(200).json(users);
})


app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.post("/user", (req, res) => {
  const newUser = {
    uid: req.body.uid + 1,
    att: req.body.att,
    total_sub: req.body.total_sub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});


app.put("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.uid === userId);
    console.log(userId);
    console.log(req.body);
    
    
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    uid: userId,
    att: req.body.att,
    total_sub: req.body.total_sub,
    bonus: req.body.bonus,
    name: req.body.name
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});


app.patch("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.att) user.naattme = req.body.att;
  if (req.body.total_sub) user.total_sub = req.body.total_sub;
  if (req.body.bonus) user.bonus = req.body.bonus;
  if (req.body.name) user.name = req.body.name;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});