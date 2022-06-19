const express=require("express");
const path=require("path");
const controller=require("../controller/formController");
const router=express.Router();

router.get("/register",controller.regForm);
router.post("/api/register",controller.postForm);
router.get("/login",controller.logForm);
router.post("/api/login",controller.getForm);
router.get("/change-password",controller.getChange);
router.post("/api/change-password",controller.change);
module.exports=router;