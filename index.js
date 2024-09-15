import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import { leakMiddleware } from './middleware/leakMiddleware.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
import './middleware/passport.js'

const app = express();

// middlewares
app.use(cors());
app.use(express.json());    // parsing json requests
app.use(leakMiddleware);    // custom middleware to prevent memory leak

// Routes
app.use('/api/users',userRoutes);

const PORT = process.env.PORT || 5000
mongoose
.connect(process.env.Mongo_URI)
.then(()=>{
console.log("Mongodb Connection is successful");

})
app.get('/',(req,res)=>{
    res.send("Hi I am practicing Node.js")
})

app.listen(PORT,()=>{
    console.log(`Server is listening to ${PORT}`);
    
})