const express=require("express");
const path=require("path");
const form=require("./routers/form")
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();

mongoose.connect("mongodb://localhost:27017/login-app-db",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
app.set("view engine","html");
app.set("views","./views");

app.use(express.static(path.join(__dirname,"views")));
app.use(bodyParser.json());
app.use("/",form);


app.listen(8000,()=>{
    console.log("server up at 8000");
})