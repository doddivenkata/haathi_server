const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host:"10.10.5.62",
    user:'root',
    password:"gqfxQz1AiAm",
    database:"haathi-proj",
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/api/insert',(req,res)=>{
    const userName = req.body.userName
    const userEmailId = req.body.useEmailId
    const userPassword = req.body.userPassword

    const sqlInsert = 'INSERT INTO userDetails (name,email_id,password) VALUES(?,?,?);'
    db.query(sqlInsert,[useName,useEmailId,usePassword],(err,result)=>{
      console.log(result)
    })
})


app.listen(3001,()=>{
    console.log("running on port 3001")
})