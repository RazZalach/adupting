const router = require('express').Router();
const {contentus_ticket}=require("../controller/contant_us.js");

router.post("/ticket",contentus_ticket);


module.exports=router;