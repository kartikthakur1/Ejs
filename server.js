// https://github.com/baljeetmatta?tab=repositories
const express = require("express");
const app = express();
app.use(express.json());
const cookieParser  = require("cookie-parser");
const sessions = require("express-session");
app.use(cookieParser());
app.use(sessions({
    secret:"asdfasdf",
    saveUninitialized:true,
    resave:false,
    cookie:{maxAge:300000}
}));
// app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("indexEjs",{name:"CodeQuotient",courses:["course1","course2","course3"]});
})

app.get("/login",(req,res)=>{
    res.render("login.ejs",{msg:""});
})
app.post("/login",(req,res)=>{
    
    if(req.body.username==req.body.password){
        req.session.username = req.body.username;
        res.redirect("/dashboard");
    }
    else{
        res.render("login",{msg:"Invalid username or password"});
    }
})
app.get("/dashboard",(req,res)=>{
    res.render("dashboard",{user:req.session.username});
})
app.listen(3000);
