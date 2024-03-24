const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const { Restaurant }=require('../Models/RestaurantModel');
const { Chef }=require('../Models/ChefModel');
const { Recette  }=require('../Models/RecetteModel');
const {verfyToken}=require('../midlware/verfyToken');
const router=express.Router();

router.get('/all',verfyToken,AsyncHandler(
    async(req,res)=>{
        const  Restaurants=await Restaurant.find();
        res.status(200).json(Restaurants);
    }
));

router.get('/Chefs/:id',AsyncHandler(
    async(req,res)=>{
        const restaurantId = req.params.id;
        const chefs = await Chef.find({ restaurant: restaurantId });
        res.status(200).json(chefs);
    }
));

router.get('/Recette/:id',AsyncHandler(
    async(req,res)=>{
        const Recettid = req.params.id;
        const Recettes = await Recette.find({ restaurant: Recettid });
        res.status(200).json(Recettes);
    }
));

router.post('/add',AsyncHandler(
    async(req,res)=>{
        const  newRestaurant= new Restaurant({
            name:req.body.name,
            location:req.body.location,
            cuisine:req.body.cuisine,
            rating:req.body.rating,
        });
        const resulta= await newRestaurant.save();
        res.status(201).json(resulta);
    }
));

router.put('/update/:id',AsyncHandler(
    async(req,res)=>{
        const  newRestaurantUpdate= await Restaurant.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name,
                location:req.body.location,
                cuisine:req.body.cuisine,
                rating:req.body.rating,
            }
        },
        {
            new: true
        });
        res.status(201).json(newRestaurantUpdate);
    }
));

router.delete('/delete/:id',AsyncHandler(
    async(req,res)=>{
        const  newRestaurantDelete= await Restaurant.findById(req.params.id);
        if(newRestaurantDelete){
            await Restaurant.findByIdAndDelete(req.params.id);
            res.status(200).json({message:'Restaurant bien supprime'});
        }
        else{
            res.status(404).json({message:'Restaurant makinchi'});
        }
    }
))

module.exports=router;