const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require("mysql")


const database = mysql.createPool({
    host:"10.10.5.62",
    user:'root',
    password:"gqfxQz1AiAm",
    database:"haathi-proj",
});


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

// app.get("/api/get",(req,res)=>{
//     const sqlGet = "SELECT * FROM userDetails";
//     database.query(sqlGet,(error,result)=>{
//         res.send(result)
//     })
// })


app.get("/",(req,res)=>{
    const sqlInsert = "INSERT INTO userDetails(name,email_id,password) VALUES('Rakesh','rakesh@gmail.com','rakesh123')";
    database.query(sqlInsert,(error,result)=>{
        console.log("error",error)
        console.log("results",result)
        res.send("hello express created successfully")
    })
})


app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})









