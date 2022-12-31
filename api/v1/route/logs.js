const router = require('express').Router();
const {saveLog,delete_all,getall}=require("../controller/log.js");

router.post("/slog",saveLog);
router.get("/all",delete_all);
router.get("/getall",getall);
module.exports=router;