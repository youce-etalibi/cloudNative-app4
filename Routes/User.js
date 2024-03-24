const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const {User  }=require('../Models/UserModel');
const router=express.Router();

router.get('/all',AsyncHandler(
    async(req,res)=>{
        const  Users=await User.find();
        res.status(200).json(Users);
    }
));
router.get('/names',AsyncHandler(
    async(req,res)=>{
        const  Userssnames=await User.find({},'name');
        res.status(200).json(Userssnames);
    }
))

router.post('/add',AsyncHandler(
    async(req,res)=>{
        const  newUser= new User({
            name:req.body.name,
            prenom:req.body.prenom,
            email:req.body.email,
            mdp:req.body.mdp,
        });
        const resulta= await newUser.save();
        res.status(201).json(resulta);
    }
));

router.put('/update/:id',AsyncHandler(
    async(req,res)=>{
        const  newUserUpdate= await User.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name,
                prenom:req.body.prenom,
                email:req.body.email,
                mdp:req.body.mdp,
            }
        },
        {
            new: true
        });
        res.status(201).json(newUserUpdate);
    }
));

router.delete('/delete/:id',AsyncHandler(
    async(req,res)=>{
        const  newUserDelete= await User.findById(req.params.id);
        if(newUserDelete){
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message:'User bien supprime'});
        }
        else{
            res.status(404).json({message:'User makinchi'});
        }
    }
))

module.exports=router;