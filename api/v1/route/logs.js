const router = require('express').Router();
const {saveLog,delete_all,getall}=require("../controller/log.js");

//נגדיר נקודת קצה end point
//עבור הרשמה והתחברות
router.post("/slog",saveLog);
router.get("/all",delete_all);
router.get("/getall",getall);

module.exports=router;