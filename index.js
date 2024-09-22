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
app.use(express.json());    
app.use(leakMiddleware);    

// Routes
app.use('/api/users',userRoutes);

const PORT = process.env.PORT || 5000
mongoose
.connect(process.env.Mongo_URI)
.then(()=>{
console.log("Mongodb Connection is successful");

})
app.get('/',(req,res)=>{
    res.send("Welcome to the Profile master API ")
})

app.listen(PORT,()=>{
    console.log(`Server is listening to ${PORT}`);
    
})


// In this project, JWT and Passport are used together for authentication. JWT is generated upon login and is passed with each request to protected routes. Passport.js, through its JWT strategy, verifies the token and allows access to those routes if the token is valid. The protect middleware ensures that routes are secured, and the leakMiddleware demonstrates how to manage potential memory leaks in a Node.js application.