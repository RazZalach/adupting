//

const router = require('express').Router();
const {create_decision , update_decision_by_id ,get_all_decisions ,get_decision_by_id ,delete_decision ,run_decision_manualy ,run_decision_automatic}=require("../controller/decision");

router.post("/run_manualy",run_decision_manualy);
router.post("/create_decision",create_decision);
router.put("/update_decision", update_decision_by_id);
router.get("/getall",get_all_decisions);
router.get("/getbyid/:id",get_decision_by_id);
router.delete("/del",delete_decision);

module.exports=router;