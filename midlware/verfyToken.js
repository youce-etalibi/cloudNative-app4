const express=require('express');
const jwt=require('jsonwebtoken');


function verfyToken(req,res,next){
    const token=process.env.TOKEN;
    if(token){
        try {
            const decoded=jwt.verify(token,'SecretKey');
            req.user=decoded;
            next();
        } catch (error) {
            res.status(401).json({message:'Token ghalat'})
        }
    }
    else{
        return res.status(403).json({messgae:'token obli'})
    }
}

module.exports={ verfyToken }