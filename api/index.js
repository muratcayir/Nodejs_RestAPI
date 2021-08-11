const express = require("express")
const app= express()
const dotenv = require("dotenv")
const mongoose= require("mongoose")


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("connected"))
.catch(err=>console.log(err))


dotenv.config()

app.use("/",(req,res)=>{
console.log("running")
})




const server = process.env.PORT || 5000;

app.listen(server,()=>{
    console.log(`Server in the port ${server} is running...`)
})