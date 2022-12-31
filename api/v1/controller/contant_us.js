
const contentus=require('../model/contentus');
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

    contentus_ticket:(req,res)=>{
    const managerEmail =process.env.USEREMAIL;
    const { fullname,email,subject,phone,body}=req.body;
    const created_at = Date(Date.now()).toString();
    const ticket=new contentus({
        _id:new mongoose.Types.ObjectId(),
        ticketid:get_random_string(5),
        fullname,email,subject,phone,body,created_at
        });
        ticket.save().then((data)=>{
            console.log(data);
            var msgbody="היי תודה על פנייתך מספר : "+ticket.ticketid+"\n אנו מטפלים בפניות קודמות ,הפנייה העוברה לטיפול נשוב ונטפל בהקדם אנא התעדכן במייל ";
            require('../../../emailsend').emailsend(email,subject,msgbody);
            var managerSubject="פנייה חדשה מספר : " +ticket.ticketid;
            var managerbody="אימייל משתמש: " + email+" טלפון משתמש : " + phone +"<br> גוף הפנייה:"+body;
            require('../../../emailsend').emailsend(managerEmail,managerSubject,managerbody);
            return res.status(200).json({msg:1});
        });

    }


   
}