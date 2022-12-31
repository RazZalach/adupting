const mongoose=require('mongoose');
mongoose.pluralize(null);
const users_schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userid:String,
    profileid:String,
    name:String,
    lastname:String,
    email:String,
    phone:String,
    city:String,
    address:String,
    d_of_birth:String,
    userpassword:String,
    validationcode:String,
    created_at:String
});
module.exports=mongoose.model("users",users_schema);
