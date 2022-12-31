const mongoose=require('mongoose');
mongoose.pluralize(null);
const content_us_schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ticketid:String,
    fullname:String,
    email:String,
    subject:String,
    phone:String,
    body:String,
    created_at:String
});
module.exports=mongoose.model("contentus",content_us_schema);
