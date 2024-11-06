import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import RegisterUser from "./models/user.models.js";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
dotenv.config();

const JWT_SECRET = "your_secret_key";

const app =express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect(process.env.MONGODB)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

app.post("/register", async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!email || !fullname || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await RegisterUser.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new RegisterUser({ fullname, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post('/api/login', async(req,res)=>{
    try {
        const [email, password] = req.body

        if(!email|| !password){
            return res.status(400).json({message: "all fields are required"})
        }

        const user = await RegisterUser.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({id: user._id, email: user.email}, JWT_SECRET, { expiresIn: "1h" })

        res.cookie("token", token)

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//middleware to verify jwt
const verifyToken = (req, res, next)=>{
    const token = req.cookie.token;

    if(!token){
        return res.status(403).json({message: "no token provided"})
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token" });
        }
        req.user = decoded;
        next();
    });
}

app.listen(3000,()=>{
    console.log("server is listening on the port 3000")
})