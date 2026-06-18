const jwt = require("jsonwebtoken");
const User = require("../models/User");


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
};


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic presence check
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "name, email and password are required"
            });
        }

        // Prevent duplicate accounts
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        // Password is hashed automatically by the pre-save hook
        const user = await User.create({ name, email, password });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        user.token = token;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

exports.logout = async (req, res) => {
    try{
        const user =await User.findById(req.user._id);
        if(user){
            user.token =null;
            await user.save();
            res.status(200).json({message:"Logout successful"});
        }
    } 

    catch (error) {
        res.status(500).json({ message: error.message });
    }
}