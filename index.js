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

app.get("/api/get",(req,res)=>{
    const sqlGet = "SELECT * FROM userDetails";
    database.query(sqlGet,(error,result)=>{
        res.send(result)
    })
})


app.post("/api/register",(req,res)=>{
   const userName =req.body.userName;
   const userEmail = req.body.userEmail;
   const userPassword = req.body.userPassword
    const sqlInsert = "INSERT INTO userDetails(name,email_id,password) VALUES(?,?,?)";
    database.query(sqlInsert,[userName,userEmail,userPassword],(error,result)=>{
        if (error){
            console.log(error)
        }else{
            res.send("you create successfully")
        }
    })
})




app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})









