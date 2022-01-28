const express=require('express')
const connectDB=require('./db/connect')
const app=express()
const tasks=require('./routes/tasks')
require('dotenv').config()
const notfound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/errorHandler')



app.use(express.static('./public'))
app.use(express.json())


 
app.use('/api/v1/tasks/',tasks)
app.use(notfound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start= async ()=>{
    try{
         await connectDB(process.env.MONGO_URI)
         app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`);
        })
    }
    catch(error){
        console.log(error);
    }
}
start()