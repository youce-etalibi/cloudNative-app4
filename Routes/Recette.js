const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const { Recette }=require('../Models/RecetteModel');
const router=express.Router();

router.get('/all',AsyncHandler(
    async(req,res)=>{
        const  Recettes=await Recette.find();
        res.status(200).json(Recettes);
    }
));
router.get('/names',AsyncHandler(
    async(req,res)=>{
        const  Recettenames=await Recette.find({},'title');
        res.status(200).json(Recettenames);
    }
))

router.post('/add',AsyncHandler(
    async(req,res)=>{
        const  newRecette= new Recette({
            title:req.body.title,
            ingredients:req.body.ingredients,
            instructions:req.body.instructions,
            chef:req.body.chef,
        });
        const resulta= await newRecette.save();
        res.status(201).json(resulta);
    }
));

router.put('/update/:id',AsyncHandler(
    async(req,res)=>{
        const  newRecetteUpdate= await Recette.findByIdAndUpdate(req.params.id,{
            $set:{
                title:req.body.title,
                ingredients:req.body.ingredients,
                instructions:req.body.instructions,
                chef:req.body.chef,
            }
        },
        {
            new: true
        });
        res.status(201).json(newRecetteUpdate);
    }
));

router.delete('/delete/:id',AsyncHandler(
    async(req,res)=>{
        const  newRecetteDelete= await Recette.findById(req.params.id);
        if(newRecetteDelete){
            await Recette.findByIdAndDelete(req.params.id);
            res.status(200).json({message:'Recette Has Deleted'});
        }
        else{
            res.status(404).json({message:'Recette Not Found'});
        }
    }
))

module.exports=router;