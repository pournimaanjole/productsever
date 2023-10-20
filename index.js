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

app.get('/delproduct' ,async(req,res)=>{
    const {name} = req.query
    const delteproduct = Ecommers.deleteOne({name:name})
    res.json({
        data:"product data delete succesfully"
    })

})
app.listen(PORT, () => {
    console.log("server  is runnig ")
})