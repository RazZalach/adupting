const path=require('path');
require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const multer=require('multer');
const mongoose=require('mongoose');
const uri=process.env.CON_STR;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log("mongo db connected ")});






const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));// רישום ספריית ה תבניות החלקיות במערכת
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'uploads')));
// הגדרת תיקייה לקבצים סטאטיים





const content_us_router = require('./api/v1/route/content_us.js');
const decision_router = require('./api/v1/route/decision.js');
const status_router = require('./api/v1/route/status.js');
const user_router = require('./api/v1/route/users.js');
const profile_router = require('./api/v1/route/profile.js');
const logs_router = require('./api/v1/route/logs.js');
const { query } = require('express');






app.use("/decision",decision_router);
app.use("/tick",content_us_router);
app.use("/prof",profile_router);
app.use("/user",user_router);
app.use("/logs",logs_router);
app.use("/status",status_router);


app.get('/cprofile',(req,res)=>{
    res.render('createprofile');   
   
})
app.use("/test",(req,res)=>{
  res.render("test");
})



app.get('/login',(req,res)=>{
    res.render('login');   
   
})
app.get('/register',(req,res)=>{
    res.render('register');   
   
})
app.get('/recover',(req,res)=>{
    res.render('recover');   
   
})
app.get('/reset',(req,res)=>{
    res.render('reset');   
   
})

app.get('/',(req,res)=>{
    res.render('index');
   
});
app.get('/info',(req,res)=>{
    res.render('info');
   
});
app.get('/about',(req,res)=>{
    res.render('about');
   
});





// // קבצים שאינם עוברים עיבוד בשרת


// // המשימה ליצור דף רספונסיבי מבוסס בוטסטראפ בשם index.html
// // כל קבצי ה CSS / JS הרלונטיים יהיהו בתוך הפרויקט



module.exports=app;