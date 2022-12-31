
const decisions=require('../model/decision');
const mongoose=require('mongoose');
const profiles = require('../model/profiles');
const status=require('../model/status');
const e = require('cors');


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
        create_decision:(req,res)=>{
            const decision_name = req.body;
            decisions.find({decision_name:decision_name.decision_name}).then((data)=>{
                if(data.length > 0 ){
                    return res.status(200).json({msg:"decision name allready exist"});
                }
                else{
                    const decisionid = get_random_string(7);
                    const newdecision = new decisions({
                        _id:new mongoose.Types.ObjectId(),
                        decisionid,
                        decision_name:decision_name.decision_name
                  
                        });
                        newdecision.save().then((data)=>{
                        return res.status(200).json({msg:data});
                    }) 
                }
            })
           
        },
       
        update_decision_by_id:(req,res)=>{
            const {decision_name,decisionid} = req.body;
            decisions.updateOne({decisionid},{$set:{decision_name}}).then((rows)=>{
                if(rows.modifiedCount > 0){
                    return res.status(200).json({msg:rows.matchedCount});
                }
                else{
                    return res.status(409).json({msg: rows});
                }
            })
        },
       
        
        get_all_decisions:(req,res)=>{
            decisions.find({},{_id:false}).then((data)=>{
               if(data.length > 0){
                return res.status(200).json({msg:data});
               } 
               else{
                return res.status(409).json({msg:data});
               }
               
            }) 
        },
       
        get_decision_by_id:(req,res)=>{
            decisions.findOne({decisionid:req.params.id}).then((data)=>{
                if(data.length == 1){
                return res.status(200).json({msg:data});
                }
                else{
                    return res.status(409).json({msg:data});
                }
            });
        },
       
        delete_decision:(req,res)=>{
            const id = req.body;
            decisions.deleteOne({decisionid:id.id}).then((data)=>{  
                 if(data.deletedCount > 0){
                return res.status(200).json({msg:"delete decision seccesful", data});
                 }
                else{
                    return res.status(409).json({msg:"cannot delete "});
                }
                
            })
        },




        
        //main functions:

        run_decision_manualy:(req,res)=>{
        const {decisionid ,profileid}= req.body;
       
        decisions.find({decisionid}).then((rows)=>{
            if(rows.length > 0){
                if(rows[0].decision_name == "העברת סטטוס נתונים"){

                    profiles.find({profileid}).then((data)=>{

                        if(data.length > 0){
     
                            if(data[0].status == 1 && data[0].salary > 0){
     
                                    profiles.updateOne({profileid},{$set:{status:2}}).then((effect)=>{
                             
                                        if(effect.modifiedCount > 0){
                                            return res.status(200).json({msg:1});
                                        }
                                    })
                          
                                  
                            }
                    

                            else if(data[0].status == 2 && data[0].region != null){
                            
                                    profiles.updateOne({profileid:profileid},{$set:{status:3}}).then((effect)=>{
                                        if(effect.modifiedCount > 0){
                           
                                            return res.status(200).json({msg:1});
                                        }
                                    })
                            }
                            else{
                          
                                return res.status(200).json({msg:"all done!"});
                            }
                          


                        }
                        
                    })
                }
                // else if(rows[0].decision_name == ""){

                // }
            }
        })
        },
        
        run_decision_automatic:(req,res)=>{

        },
    }