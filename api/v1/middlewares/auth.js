const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    
  
    try{
        const token=req.headers.authorization;      
        
        const { manager } = jwt.verify(token, process.env.SECRET_KEY);
        req.manager = manager;
        next();
    }
    catch(error)
    {
       return res.status(401).json({msg:"not authorized request "});
    }

};


