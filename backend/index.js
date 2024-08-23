import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"gamesdb"
})



app.get("/", (req, res)=>{
    res.json("hello this is the backend")
})

app.get("/games", (req, res)=>{
    const q = "SELECT * FROM games";
    db.query(q,(err, data)=>{
        if(err) 
            return res.json(err);
        else
            return res.json(data);
    })
})

app.post("/games", (req, res)=>{
    const q = "INSERT INTO games(`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json("game has been created successfully");
        }
    })
})

app.delete("/games/:id", (req, res)=>{
    const gameId = req.params.id;
    const q = "DELETE FROM games WHERE id = ?"

    db.query(q,[gameId], (err, data)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json("game has been deleted successfully");
        }
    })
})

app.put("/games/:id", (req, res)=>{
    const gameId = req.params.id;
    const q = "UPDATE games SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
     

    db.query(q,[...values, gameId], (err, data)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json("game has been updated successfully");
        }
    })
})

app.listen(5000, ()=>{
    console.log("Connected to backend!")
})