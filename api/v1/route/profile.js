const router = require('express').Router();
const {update_region,create_profile_stg1,get_profile_byid,get_profile_byid_no_render,updatesalary}=require("../controller/profile.js");

//נגדיר נקודת קצה end point
//עבור הרשמה והתחברות
router.post("/region",update_region);
router.post("/create",create_profile_stg1);
router.get("/getpro/:profileid",get_profile_byid);
router.post("/getbyid",get_profile_byid_no_render);
router.post("/salary",updatesalary);


module.exports=router;