const model = require("./users/model");

// BUILD YOUR SERVER HERE

const express = require("express");


const app = express();
app.use(express.json());

app.get("/api/users", (req, res) => {
  model
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json({ message: `Server Error :${err.message}` }));
});

app.get("/api/users/:id", (req, res) => {
  const idVar = req.params.id;
  model
    .findById(idVar)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: `ID ${idVar} does not exist.` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => res.status(500).json({ message: `Server Error :${err.message}` }));
});

app.post("/api/users",(req,res)=>{
    const {name, bio} = req.body;
    model.insert({name,bio}).then((newUser)=>{
       res.status(201).json(newUser)
}).catch((err)=>{
    console.log(err.message)
})
});



app.put("/api/users/:id", (req,res)=>{
    const idVar =req.params.id
    const user= req.body
    model.update(idVar,user).then((upUser)=>{
        if (upUser === null){
            res.status(404).json({message:" User does not exist."})
        }else {
            res.status(200).json(upUser)
        }
        
    }).catch(err => {
        console.log(err.message)
    })
})

app.delete("/api/users/:id", (req,res)=>{
    const idVar = req.params.id;
    model.remove(idVar).then((user)=>{
        res.status(200).json({message: `The user at ID: ${user.id} was deleted`})
    }).catch((err)=>{ console.log(err.message)})
})

    app.use("*",(req,res)=>{
        res.status(404).json({message:"404 not found)*"})
    })

module.exports = app;
