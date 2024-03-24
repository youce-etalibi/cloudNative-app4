const express =require('express');
const AsyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const RestaurantPath=require('./Routes/Restaurant');
const RecetterrPath=require('./Routes/Recette');
const ChefPath=require('./Routes/Chef');
const userPath=require('./Routes/User');
const AuthPath=require('./Routes/Auth');
dotenv.config();

mongoose
    .connect(process.env.URL_MONGOOSE)
    .then(()=>console.log(`Server is Connected A mongodb`))
    .catch((err)=>console.log(`Server Failed A connected `,err));

const app =express();
app.use(express.json());

app.use('/users',userPath);
app.use('/Chefs',ChefPath);
app.use('/Recette',RecetterrPath);
app.use('/restaurant',RestaurantPath);
app.use('/Auth',AuthPath);


const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server is runing on ${PORT}`));