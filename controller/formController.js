const User=require("../model/user");
const bcrypt=require("bcryptjs");
const path=require("path");

exports.regForm=(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","index.html"));
}
exports.logForm=(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","login.html"));

}
exports.postForm=async (req,res)=>{
    const {username,password:plainTextPassword}=req.body;
    if(!username||typeof username!== "string"){
        return res.json({status:"error", error:"Invalid username"});
    }
    if(!plainTextPassword||typeof username!== "string"){
        return res.json({status:"error", error:"Invalid password"});
    }
    if(plainTextPassword.length<5){
        return res.json({status:"error", error:"Small password"});
    }
    const password=await bcrypt.hash(plainTextPassword,10);
    try{
        const response=await User.create({
            username,
            password
        })
        res.json({status:"ok"});
    }catch(err){
        console.log(JSON.stringify(err));
        if(err.code===11000){
            return res.json({status:"error",err:"Username already in use"});
        }
        throw err;
        
    }
    
}
exports.getForm=async (req,res)=>{
    res.render("login");
}