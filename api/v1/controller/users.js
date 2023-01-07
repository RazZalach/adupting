
const bcrypt=require("bcrypt");
const users=require('../model/users');
const mongoose=require('mongoose');

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
    delete_all_users:(req,res)=>{
        users.deleteMany({}).then(()=>{
            return res.status(200).json({msg:"delet all users!"})
        })
    },
                get_all_users:(req,res)=>{
                    users.find().then((data)=>{
                        if(data.length > 0 ){
                            res.send(data);
                        }
                        else{
                            console.log("cannot fetch!");
                        }
                    })                              
                },
                register:(req,res)=>{
                    const{name,lastname,email,phone,city,address,d_of_birth,userpassword}= req.body;
                    const userid = get_random_string(5);
                    const created_at = Date(Date.now()).toString();
                    users.find({email}).then((data)=>{
                        if(data.length > 0){
                            return res.status(404).json({msg:0});
                        }
                        else{
                            bcrypt.hash(userpassword,12).then((hashPass)=>{
                                const newuser = new users({
                                _id:new mongoose.Types.ObjectId(),
                                profileid:"",
                                userid,name,lastname,email,phone,city,address,d_of_birth,userpassword:hashPass,created_at
                                });
                                newuser.save().then((data)=>{
                                return res.status(200).json({msg:1});
                                })
                            })
                    
                        }
                    }) 
                        
                },
                 login:(req,res)=>{
                    
                    const{email,userpassword}= req.body;
                    users.find({email}).then((usr)=>{
                        if(usr.length > 0){
                            bcrypt.compare(userpassword,usr[0].userpassword).then((status)=>{
                                if(status){     
                                    return res.status(200).json({msg:usr[0]});
                                }
                                else{
                                    return res.status(409).json({msg:"סיסמא לא נכונה"});
                                }
                            })
                        }
                        else{
                           return res.status(409).json({msg:" כתובת מייל לא קיימת"});
                        }
                    }) 
                },
                recover_pass: function(req,res){ 
                    const email=req.body;
                    const TmpPass=get_random_string(12);
                    bcrypt.hash(TmpPass,12).then((hashPass)=>{
                        users.find({email:email.email}).then((data)=>{
                            if(data.length > 0){
                                users.updateOne({email:email.email},{$set:{validationcode:TmpPass}}).then((rows)=>{
                                    if(rows.modifiedCount > 0){
                                        var subj="reset password mod";
                                        var body=`<h1>  temporary pass: <br> ${TmpPass}  </h1>`;
                                        require('../../../emailsend').emailsend(email,subj,body);
                                        return res.status(200).json({msg:`email sent temp pass : ${TmpPass}`});
                                    }
                                    else{
                                        return res.status(409).json({msg:"cannot be updated"});
                                    }
                                   
                                })
                            }
                            else{
                                return res.status(409).json({msg:"email not found!!!"});
                            }
                            
                        })
                   
                    })
                },
                reset_pass:(req,res)=>{

                    const {email,validationcode,newpass} = req.body;
  
                    users.find({email}).then((rows)=>{
                            if(validationcode != rows[0].validationcode){
                                return res.status(404).json({msg:"Temporary password not match"})
                            }
                            else{ 
                                bcrypt.hash(newpass,12).then((hashpass)=>{
                                    users.updateOne({email},{$set:{userpassword:hashpass}}).then((rows)=>{
                                        if(rows.modifiedCount > 0)
                                            return res.status(200).json({msg:1});

                                        else return res.status(404).json({msg:0});
                                    })
                                })
                            }
                        
                    })             
                }
}