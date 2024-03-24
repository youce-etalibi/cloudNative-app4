const mongoose=require('mongoose');

const SchemaRestaurant=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
    
},{
    timestamps:true
});
 
const Restaurant=mongoose.model('Restaurant',SchemaRestaurant);
module.exports={
    Restaurant
}