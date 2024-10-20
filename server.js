const express=require("express");
const app=express();
const path=require('path');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const port=process.env.PORT || 4000;
const AuthRoute=require('./routes/router.js');
const {checkAuth,getinfo}=require('./Auth/CheckAuth.js');
const ejs=require('ejs');
const connectDB=require('./connection.js');
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.get('/',getinfo,(req,res)=>{
    res.render('index.ejs',{url:req.protocol+"://"+req.headers.host,user:req.user});
})
app.get('/insider',checkAuth,function(req,res){
    res.render('visit.ejs',{user:req.user});
})
app.use('/user',AuthRoute);
app.get('/signup',function(req,res){
    res.render('SignUp.ejs',{url:req.protocol+"://"+req.headers.host});
})
app.get('/login',function(req,res){
    res.render('Login.ejs',{url:req.protocol+"://"+req.headers.host});
})
app.get('/logout',async (req,res)=>{
    res.clearCookie("jwt");
    console.log("logout successfully");
    req.user={}
    res.redirect('/');
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})
