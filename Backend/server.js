const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

//Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abinaya@2003",
    database: "demo"
})

//Check the db connection
db.connect(err => {
    if(err) throw err;
    console.log("Database connected successfully");
})

//Get all studends
app.get("/students",(req, res) => {
    db.query("SELECT * FROM student",(err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

//Create a student
app.post("/students", (req, res) => {
    const {name, email} = req.body;

    db.query("INSERT INTO student (name, email) VALUES (?, ?)",[name, email ], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({message : "Student added successfully"})
    })
})

//Get one record based on id
app.get("/students/:id", (req, res) => {
    const {id} = req.params;
    const sql = "SELECT * FROM student WHERE id = ? ";
    db.query(sql,[id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result[0]);
    })
})

//Update
app.put("/students/:id", (req, res) => {
    const {name, email} = req.body;
    const {id} = req.params;
    const sql = "UPDATE student SET name= ?, email= ? WHERE id = ?";
    db.query(sql,[name, email, id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({message: "student updated successfully"})
    }) 
})

//delete
app.delete("/students/:id", (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM student WHERE id= ?";
    db.query(sql,[id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({message : "student deleted successfully"});
    })
})

app.listen(5000, () => console.log("Server running on port 5000"))