const mongoose=require('mongoose');

const SchemaRecette=new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    chef: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Chef', 
        required: true
    },   
},{
    timestamps:true
});
 
const Recette=mongoose.model('Recette',SchemaRecette);
module.exports={
    Recette
}