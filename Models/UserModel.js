const mongoose=require('mongoose');

const SchemaUser=new mongoose.Schema({
   name:{
        type:String,
        required:true,
        minlength:5,
        trim :true
   } ,
   prenom:{
        type:String,
        required:true,
        minlength:5,
        trim :true
    } ,
   email:{
        type:String,
        required:true,
        trim :true,
        unique:true
    } ,
    mdp:{
        type:String,
        required:true,
        trim :true
    } ,
    
},{
    timestamps:true
});
 
const User=mongoose.model('User',SchemaUser);
module.exports={
    User
}