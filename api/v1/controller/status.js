
const bcrypt=require("bcrypt");
const status=require('../model/status');
const mongoose=require('mongoose');
const { json } = require("express");

module.exports={

        create_status:(req,res)=>{
            const {statusid,description} = req.body;
            status.find({statusid}).then((rows)=>{
                console.log(rows);
                if(rows.length == 0 ){
                    const newstatus = new status({
                        _id:new mongoose.Types.ObjectId(),
                        statusid,description
                    });
                    newstatus.save().then((data)=>{
                        return res.status(200).json({msg:data})
                    })
                   
                }
                else{
                    return res.status(409).json({msg:`already exist ${rows}  `});
                }
            })
        },
        get_all_status:(req,res)=>{
            
            status.find({},{_id:false}).then((rows)=>{
                if(rows.length > 0 )
                return res.status(200).json({msg:rows});
                else  return res.status(409).json({msg:"cant"});
            })
        },
        update_status:(req,res)=>{
            const {statusid,description} = req.body;
            status.updateOne({statusid},{$set:{description}}).then((effectrows)=>{
                    if(effectrows.modifiedCount > 0){
                        return res.status(200).json({msg:1});
                    }
                    else return res.status(409).json({msg:0});
            })
        }
}