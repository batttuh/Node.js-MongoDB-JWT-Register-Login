const User=require("../model/user");
const bcrypt=require("bcryptjs");
const path=require("path");
const jwt=require("jsonwebtoken");
const JWT_SECRET="asa£>21ı@asdsaçdieqw<421";
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
    const {username,password}=req.body;

    const user=await User.findOne({username}).lean();
    if(!user){
        return res.json({status:"error",error:"Invalid username"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({id:user._id,username:user.username},JWT_SECRET);
        return res.json({status:"ok",data:token});
    }
}
exports.change=async (req,res)=>{
    const {token,newpassword:plainTextPassword}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const _id=user.id;
        const password=await bcrypt.hash(plainTextPassword,10)
        await User.updateOne({_id},{
            $set:{password}
        })
        res.json({status:"ok"})
    }
    catch(error){
        console.log(error);
    }
}
exports.getChange=(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","change-password.html"));

}