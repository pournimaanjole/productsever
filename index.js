import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

import mongoose, { model, Schema } from 'mongoose';

const app = express();
app.use(express.json());
const PORT = 5000

const connectToMongodb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_DB);
    if (connect) {
        console.log("connect to mongodb")
    }
}
connectToMongodb();

const eCommersSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    brand: String,
    productimg: String
})

const Ecommers = mongoose.model('Ecommer', eCommersSchema);

app.get('/products' , async (req,res)=>{
    const findingProduct =await Ecommers.find();
    res.json({
        data:findingProduct
    })

})

app.post('/product', async (req, res) => {

    const { name,description, price, brand, productimg } = req.body
    const product =  new Ecommers({
        name:name,
        description:description,
        price:price,
        brand:brand,
        productimg:productimg

    })
    const newProduct = await product.save();
    res.json({
        data:newProduct
    })

   
})

app.get('/product' , async(req,res) =>{
const {name} = req.query
const findingOneProduct =await Ecommers.findOne({name:name})
res.json({
    data:findingOneProduct
})
})

// delete 

app.delete('/product/:_id' ,async(req,res)=>{
    const {_id} = req.params
    const deltedproduct = await Ecommers.deleteOne({_id:_id})
    res.json({
        data:`this deleted succesfully ${_id}`
    })
})


// put
app.put('/productput/:_id' ,async(req,res)=>{
    const {_id} = req.params
    const {name,description, price, brand, productimg} = req.body 

    if(!name) {
     return   res.json({
            message:"name is requred"
        })
    }

    if(!description) {
        return   res.json({
               message:"name is requred"
           })
       }

       if(!price) {
        return   res.json({
               message:"name is requred"
           })
       }

       if(!brand) {
        return   res.json({
               message:"name is requred"
           })
       }
       if(!productimg) {
        return   res.json({
               message:"name is requred"
           })
       }

    await Ecommers.updateOne({_id:_id} ,{$set:{
        name:name,
        description:description,
        price:price,
        brand:brand,
        productimg:productimg
    }})

    const updateproductfind = await Ecommers.findOne({_id:_id}) 

     res.json({
       
     data:updateproductfind
    })
})

// patch

app.patch('/productpatch/:_id' , async(req,res)=>{
 const {_id} = req.params  
 const {name,description, price, brand, productimg} = req.body
 
const productpatch = await Ecommers.findOne({_id:_id});
if(name){
    productpatch.name = name
}
if(description){
    productpatch.description = description
}
if(price) {
    productpatch.price = price
}

if(brand){
    productpatch.brand = brand
}

if(productimg){
    productpatch.productimg = productimg
}

const saved = await productpatch.save();
res.json({
    data:saved
})



})

app.listen(PORT, () => {
    console.log("server  is runnig ")
})