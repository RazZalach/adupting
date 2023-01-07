const router = require('express').Router();
const {save_manager,delete_manager,get_all_managers,login_manager}=require("../controller/managers");

router.post("/login",login_manager);
router.get("/get_all",get_all_managers);
router.post("/register",save_manager);
router.post("/delete",delete_manager);
module.exports=router;