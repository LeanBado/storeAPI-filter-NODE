require('dotenv').config()
const colors = require('colors');


const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        
        console.log(`CONNECT TO MONGODB, DELETE ALL AND UPLOAD FULL LIST ... SUCCESS`.bgGreen)
        
    } catch (error) {
        console.log(error)
        
    }
}

start()