const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const {Chef  }=require('../Models/ChefModel');
const router=express.Router();

router.get('/all',AsyncHandler(
    async(req,res)=>{
        const  Chefs=await Chef.find();
        res.status(200).json(Chefs);
    }
));
router.get('/names',AsyncHandler(
    async(req,res)=>{
        const  Chefnames=await Chef.find({},'name');
        res.status(200).json(Chefnames);
    }
))

router.post('/add',AsyncHandler(
    async(req,res)=>{
        const  newChef= new Chef({
            name:req.body.name,
            specialty:req.body.specialty,
            experience:req.body.experience,
            restaurant:req.body.restaurant,
        });
        const resulta= await newChef.save();
        res.status(201).json(resulta);
    }
));

router.put('/update/:id',AsyncHandler(
    async(req,res)=>{
        const  newChefUpdate= await Chef.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name,
                specialty:req.body.specialty,
                experience:req.body.experience,
                restaurant:req.body.restaurant,
            }
        },
        {
            new: true
        });
        res.status(201).json(newChefUpdate);
    }
));

router.delete('/delete/:id',AsyncHandler(
    async(req,res)=>{
        const  newChefDelete= await Chef.findById(req.params.id);
        if(newChefDelete){
            await Chef.findByIdAndDelete(req.params.id);
            res.status(200).json({message:'Chef Has Deleted'});
        }
        else{
            res.status(404).json({message:'Chef Not Found'});
        }
    }
))

module.exports=router;