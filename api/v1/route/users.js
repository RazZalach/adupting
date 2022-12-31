const router = require('express').Router();
const {get_all_users,register,login,recover_pass,reset_pass}=require("../controller/users.js");

router.get("/getall",get_all_users);
router.post("/reg",register);
router.post("/log",login);
router.post("/rec",recover_pass);
router.post("/res",reset_pass);

module.exports=router;