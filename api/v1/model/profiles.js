const mongoose=require('mongoose');
mongoose.pluralize(null);
const profile_schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    profileid:String,
    userid:String,
    name:String,
    lastname:String,
    d_of_birth:String,
    phone:String,
    city:String,
    address:String,
    street:String,
    region:String,
    email:String,
    employment:String,
    status:Number,
    salary:Number,
    image:String,
    created_at:String
});
module.exports=mongoose.model("profiles",profile_schema);

