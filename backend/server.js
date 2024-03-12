const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();



const app = express()
app.use(cors())
app.use(express.json());


const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})
app.get('/',(req,res)=>{
    const sql = "SELECT * FROM `users`";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/department',(req,res)=>{
    const sql = "SELECT * FROM department";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/create',(req,res)=>{
    const sql = "INSERT INTO users (`id`,`name`,`age`,`department_id`,`salary`) VALUES(?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.age,
        req.body.department_id,
        req.body.salary,
    ]
    db.query(sql, [values],(err, data)=>{
        if(err) return res.json(err);
        return res.json("created");
    })
})
app.put('/update/:id',(req, res) => {
    const sql = "UPDATE users set `name` =?, `age` =?, `department_id` =?, `salary` =? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.age,
        req.body.department_id,
        req.body.salary,
    ]
    const id = req.params.id;

    db.query(sql, [...values, id],(err, data) => {
        if(err) return res.json(err);
        return res.json("updated");
    })
})

app.delete('/delete/:id',(req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id],(err, data) => {
        if(err) return res.json(err);
        return res.json("deleted");
    })
})


app.listen(6530,()=>{
    console.log('Listening 6530 .....')
})



