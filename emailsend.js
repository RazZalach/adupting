const nodemailer = require('nodemailer');

module.exports={
    emailsend:(to,subject,Body)=>{
       
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                
                user:process.env.USEREMAIL,
                pass:process.env.PASSEMAIL
            }
        });

        let mailDetails = {
            from:process.env.USEREMAIL,
            to:to.email,
            subject,
            html:Body  
        };
    
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err);
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });  
    }
}