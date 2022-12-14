const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const { response } = require('express')



const db = mysql.createPool({
    host:"10.10.5.62",
    user:'root',
    password:"gqfxQz1AiAm",
    database:"haathi-proj",
});


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/get/",(req,res)=>{
    const sqlGet = "SELECT * FROM userDetails";
    db.query(sqlGet,(error,result)=>{
        res.send(result)

    })
})



app.post("/register/",async(req,res)=>{
 

  const {userName,userEmail,userPassword} = req.body
  const hashedPassword = await bcrypt.hash(userPassword,10)
  const selectUserQuery = "SELECT * FROM userDetails WHERE email_id = ?";

  db.query(selectUserQuery,[userEmail],(err,result)=>{
   if (err){
    return res.send({err:err});
   }
   if(result.length > 0){
    return res.send("all ready exists ")
   }else{
        const sqlInsert = "INSERT INTO userDetails(name,email_id,password) VALUES(?,?,?)";
        db.query(sqlInsert,[userName,userEmail,hashedPassword],(err,result)=>{
            res.send("User create successfully")
            if (err){
               return res.send({err:err})
            }else{
                return res.send("User created successfully")
            }
        })
    }
})
})




  app.post("/login", (req, res) => {
    const {userName,userPassword} = req.body
    const SelectUser = "SELECT * FROM userDetails WHERE name = ?";
  
    db.query(SelectUser,[userName],(err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
          bcrypt.compare(userPassword, result[0].password, (error, response) => {
            if (response) {
            //   req.session.user = result;
            //   console.log(req.session.user);
              res.send({message:"Login Success"});
            } else {
              res.send({ message: "Wrong username/password combination!" });
            }
          });
        } else {
          res.send({ message: "User doesn't exist" });
        }
      }
    );
  });
  
  




app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})









