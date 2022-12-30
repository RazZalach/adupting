const router = require('express').Router();
const {create_status,get_all_status,update_status}=require("../controller/status");

//נגדיר נקודת קצה end point
//עבור הרשמה והתחברות
router.post("/create",create_status);
router.get("/all",get_all_status);
router.post("/update",update_status);


module.exports=router;