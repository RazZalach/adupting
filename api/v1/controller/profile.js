const mongoose=require('mongoose');
const bcrypt=require("bcrypt");
const profiles = require('../model/profiles');
const users=require('../model/users');
// const jwt = require("jsonwebtoken");


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

    create_profile_stg1:(req,res)=>{
        const {userid,image}=req.body;

        const profileid = get_random_string(5);
        const created_at = Date(Date.now()).toString();
      users.find({userid}).then((userdata)=>{
        profiles.find({userid}).then((rows)=>{
    
          if ( rows.length == 0 ) {
         const newprofile = new profiles({
           _id:new mongoose.Types.ObjectId(),
           profileid:profileid,userid,name:userdata[0].name,lastname:userdata[0].lastname,d_of_birth:userdata[0].d_of_birth,phone:userdata[0].phone,city:userdata[0].city,address:userdata[0].address,email:userdata[0].email,created_at,image,
           status:1
         });
         newprofile.save().then((data)=>{ 
   
          users.updateOne({userid},{$set:{profileid:data.profileid}}).then((efect)=>{
      
            return res.status(200).json({msg:data.profileid});
          })

         })
        }
       else
      return   res.status(200).json({msg:rows[0].profileid});
        })
      })
    

      
       
    },
    get_profile_byid_no_render:(req,res)=>{
      const profileid = req.body;

      profiles.find({profileid:profileid.profileid}).then((data)=>{
        if(data.length > 0 ){
  
          return res.status(200).json({msg:data[0]});
        }
        else{
          return res.status(409).json({msg:0});
        }
      })
    },
    get_profile_byid:(req,res)=>{
      const profileid = req.params.profileid;
      var id = profileid+"";
      var arr = id.split("=");
      profiles.find({profileid:arr[1]}).then((data)=>{
       
        if(data.length > 0){
           return res.render('profile',{name:data[0].name,image:data[0].image,city:data[0].city,phone:data[0].phone,status:data[0].status,email:data[0].email}); 
        } 
      })
    },
    updatesalary:(req,res)=>{
      const {salary,profileid }= req.body;
      profiles.updateOne({profileid},{$set:{salary}}).then((effect)=>{
        if(effect.modifiedCount > 0){
          return res.status(200).json({msg:1});
        }
        else return res.status(407).json({msg:0});
      })
    },
    update_region:(req,res)=>{
      const {region,profileid}= req.body;
      profiles.updateOne({profileid},{$set:{region}}).then((effect)=>{
        if(effect.modifiedCount > 0){
          return res.status(200).json({msg:1});
        }
        else return res.status(407).json({msg:0});
      })
    },

         //return res.status(404).json({msg:0});
}