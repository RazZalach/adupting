const mongoose=require('mongoose');
mongoose.pluralize(null);
const managers_schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    mid:String,
    email:String,
    pass:String,
    temppass:String,
    name:String
});
module.exports=mongoose.model("managers",managers_schema);
