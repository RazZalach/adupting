const mongoose=require('mongoose');
mongoose.pluralize(null);
const status_schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    statusid:Number,
    description:String
});
module.exports=mongoose.model("status",status_schema);

