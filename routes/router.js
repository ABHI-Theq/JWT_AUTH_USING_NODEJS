const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');

const {signupUser,loginUser}=require('./../Auth/authFunc.js');
router.post('/signup',signupUser)



router.post('/login',loginUser)

module.exports=router;