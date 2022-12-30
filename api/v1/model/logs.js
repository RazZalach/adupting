const mongoose=require('mongoose');
mongoose.pluralize(null);
const logs_schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    logid:String,
    operation:String,
    request:String,
    response:String,
    current_time:String,
    deviceinfo:String,
    ipaddress:String
});
module.exports=mongoose.model("logs",logs_schema);