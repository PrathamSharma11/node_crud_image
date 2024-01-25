const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser if still needed
const connectDB = require('./db/connectdb.js');
const app = express();
const port = 3000;
const router = require('./routes/web');
const jwt = require('jsonwebtoken');
const secretKey="secretKey";
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// EJS
app.set('view engine', 'ejs');

// Database connection
connectDB();

// Linking routes
app.use('/', router);


//for_jsonwebtoken
app.get("/j",(req,res)=>{
  response.json({
    message:"a sample api"
  })
})
app.post("/login",(req,res)=>{
  const  user={
    id:1,
    username:"anil",
    email:"abc@test.com"
  }
  jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
    res.json({
      token
    })
  })
})
app.post("/profile",verifyToken,(req,res)=>{
  jwt.verify(req.token,secretKey,(err,authData)=>{
    if(err){
      res.send({result:"invalid token"})
    }else{
      res.json({
        message:"profile accessed",
        authData
      })
    }
  })

})

function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== "undefined"){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();

  }else{
    res.send({
      result:'Token is not valid'
    })
  }
}



// Server creation
app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
