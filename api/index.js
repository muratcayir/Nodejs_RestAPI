const express = require("express")
const dotenv = require("dotenv")
const mongoose= require("mongoose")
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
const categoriesRoute = require("./routes/categoriesRoute")


const app= express()
dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("connected"))
.catch(err=>console.log(err))


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);



const server = process.env.PORT || 5000;

app.listen(server,()=>{
    console.log(`Server in the port ${server} is running...`)
})