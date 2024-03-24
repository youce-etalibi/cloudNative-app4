const express=require('express');
const asyncHandler=require('express-async-handler');
const router=express.Router();
const {User}=require('../Models/UserModel');
const bcryptjs=require('bcryptjs');
const jwt =require('jsonwebtoken');
router.post('/register',asyncHandler(
    async(req,res)=>{
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({message: 'hada deja kayn' });
        }  
        const salt=await bcryptjs.genSalt(10);
        req.body.mdp=await bcryptjs.hash(req.body.mdp,salt);
        user = new User ({
            name:req.body.name,
            prenom:req.body.prenom,
            email:req.body.email,
            mdp:req.body.mdp,
        })

        const resulta=await user.save();
        const token=jwt.sign({id:user._id},'SecretKey');
        const {mdp, ...other}=resulta._doc;
        res.status(201).json({...other,token});
    }
));

router.post('/login',asyncHandler(
    async(req,res)=>{
        let user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({message: 'email ou password halat' });
        }  
        const IsPassword=await bcryptjs.compare(req.body.mdp,user.mdp);
        if(!IsPassword){
            return res.status(400).json({message: 'email oula password ghalat' });
        }   
        const token=jwt.sign({id:user._id},'SecretKey');
        const {mdp, ...other}=user._doc;
        res.status(201).json({...other,token});
    }
));

module.exports=router;