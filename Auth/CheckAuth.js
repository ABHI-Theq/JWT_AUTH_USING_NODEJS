const jwt=require('jsonwebtoken');
const User=require('./../model/user_Schema.js');
async function checkAuth(req,res,next){
    try {
        const token = req.cookies?.jwt;
        console.log(token);
        if (!token) {
          return res.redirect('/login');
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              if (err.name === 'TokenExpiredError') {
                // Token has expired, handle the error
                console.log('Token has expired');
                req.erroring="TOken has Expired";
                return res.redirect('/login')
              } else {
                // Other error, handle it accordingly
                console.log('Error verifying token:', err);
              }
            } else {
              // Token is valid, proceed with the request
              if (!decoded) {
                return res.redirect('/login');
              }
              console.log(decoded); 
              req.user = decoded;
            //   next();
            }
          });
          
        // const user = await jwt.verify(token, process.env.JWT_SECRET);
        // console.log(user);
        // if (!user) {
        //   return res.redirect('/login');
        // }
        // const userObj = await User.findOne({ email: user.email });
        // if (user.exp <= userObj.exp) {
        //   return res.status(404).json({ msg: "token has expired" });
        // }
        // req.user = user;
        next();
      } catch (err) {
        console.log(err);
      }
}
async function getinfo(req,res,next){
    try{const token=req.cookies?.jwt;
        console.log(token);
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              if (err.name === 'TokenExpiredError') {
                // Token has expired, handle the error
                console.log('Token has expired');
                // req.erroring="TOken has Expired";
                // return res.redirect('/login')
              } else {
                // Other error, handle it accordingly
                console.log('Error verifying token:', err);
              }
            } else {
              // Token is valid, proceed with the request
              if (!decoded) {
                return res.redirect('/login');
              }
              console.log(decoded); 
              req.user = decoded;
            //   next();
            }
          });
        }
    next();
}
    catch(err){
        console.log(err);
    }
}
module.exports={checkAuth,getinfo};