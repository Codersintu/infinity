const express = require("express")
const dotenv=require("dotenv")
const mongoose =require('mongoose')
const morgan=require("morgan")
const authRouter=require("./routes/auth")
const UserRouter=require("./routes/User")
const app=express();
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            // No deprecated options needed
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
connectDB();
//console.log('MongoDB URL:', process.env.MONGO_URL);
app.use(express.json());
app.use(morgan("common"))

app.use("/api/auth",authRouter);
app.use("/api/User",UserRouter)


const PORT=5002;
app.listen(PORT,()=>{
   console.log(`server is running http://localhost:${PORT}`)
})

