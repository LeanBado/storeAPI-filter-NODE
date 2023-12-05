const dotenv = require("dotenv").config()
const express = require('express')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const app = express()
var colors = require('colors');

const productRouter = require('./routes/products')

//middleware
app.use(express.json())


//rootes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route </a>')
})

app.use('/api/v1/products',productRouter)

//products route
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        console.log(`CONNECTED TO MongoDB...`.bgGreen)
        app.listen(port, console.log(`Server is listening on port ${port}...`.bgGreen))
        
    } catch (error) {
        console.log(error.gbRed)
        
    }
}

start()