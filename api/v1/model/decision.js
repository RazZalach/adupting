const mongoose=require('mongoose');
mongoose.pluralize(null);
const decision_schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    decisionid:String,
    decision_name:String

});
module.exports=mongoose.model("decision",decision_schema);