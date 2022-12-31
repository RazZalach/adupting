const mongoose=require('mongoose');
const logs = require('../model/logs');

    function get_random_string(length){
        let str="";
        const chars="abcdefghijklmnopqrstuvwxyz0123456789";
        let index;
        for(let i=0;i<length;i++)
        {
            index=Math.floor(Math.random() * chars.length);
            str+=chars[index];
        }
        return str;
    }

module.exports={

    saveLog:(req,res)=>{
        const { operation,request,response,deviceinfo,ipaddress}= req.body;  
        const newlog = new logs({
            _id:new mongoose.Types.ObjectId(),
            logid: get_random_string(5),
            current_time:Date(Date.now()).toString(),
            operation,request,response,deviceinfo,ipaddress
        });
        newlog.save().then((data)=>{
        return res.status(200).json({msg:1});
       }) 
    },
    delete_all:(req,res)=>{
        logs.deleteMany({}).then(()=>{
            return res.status(200).json({msg:"delet all logs!"})
        })
    },
    getall:(req,res)=>{
        logs.find({},{_id:false}).then((data)=>{
            return res.status(200).json({msg:data});
        })
        
    }
};