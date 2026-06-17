const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes: verifies the JWT sent in the Authorization header
const protect = async (req, res, next) => {
    try {
        let token;

        // Expecting header in the form: "Authorization: Bearer <token>"
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token provided"
            });
        }

        // Verify the token signature & expiry
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user (without password) to the request
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "Not authorized, user no longer exists"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed",
            error: error.message
        });
    }
};

module.exports = protect;
