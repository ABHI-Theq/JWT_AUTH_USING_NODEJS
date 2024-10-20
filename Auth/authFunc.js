const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connectDB=require('./../connection.js');
// const 
connectDB();
const User=require('./../model/user_Schema.js');
async function signupUser (req,res,next){
    const {fullname,email,password}=req.body;
    const cleanPwd=password;
    // const password=bcrpyt.
    try{
        let use=await User.findOne({email});
        if(use){
            return res.status(400).json({msg:"user alsready exists"});
            // next();
        }

        const salt=await bcrypt.genSalt(10);
        const pwd=await bcrypt.hash(password,salt);
        // console.log("gey")
        await User.create({
            fullName:fullname,
            email:email,
            password:pwd,
            cleanPwd:cleanPwd,
        })
        const token=jwt.sign({
            name:fullname,
            email:email,
            password: password,
        },process.env.JWT_SECRET,{
            expiresIn:"60s"
        })
        res.cookie("jwt",token,{
            httpOnly:true,
            expiresIn:"60s"
        })
        res.redirect('/');
        next();   
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error" ,
          "message":{err}
        })
      }
}

async function loginUser(req,res){
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        const isMatch=await bcrypt.compare(password,user.password);
        // console.log(user.password,password);
        if (!user) {
            return res.status(400).json({ msg: "Email does not exist" });
          }
        if(!isMatch){
            return res.status(400).json({msg:"invalid credentials"});
        }
        user.createdAt=Date.now();
        console.log(Date.now())
            const token=jwt.sign({
                id:user._id,
                name:user.fullName,
                email:user.email,
                password:user.password
            },process.env.JWT_SECRET,{
                expiresIn:"30m"
            })

            // console.log(token);
        res.cookie("jwt",token,{
            httpOnly:true,
            expiresIn:"30m"
        })
        return res.redirect('/' );
    }catch(e){
        return res.status(400).json({msg:e.message});
    }
}
module.exports={
 signupUser,loginUser   
}





