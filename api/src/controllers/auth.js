import Users from "../models/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) {
        return res.status(401).json({ message: "Wrong password or email" });
    }

    const token = jwt.sign({ userId: user.user_id, email: user.email, role_id: user.role_id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
            id: user.user_id,
            username: user.username,
            email: user.email,
            role_id: user.role_id
        }
    });
};

export const logoutUser = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "Logout gagal" });
    }

    res.status(200).json({ message: "Logout successful." });
};

export const me = async (req, res) => {
    const user = await Users.findOne({
        where: {
            user_id: req.user.userId
        },
        attributes: ["user_id", "username", "email", "role_id"]
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ 
        message: "Login berhasil", 
        user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            role_id: user.role_id
        }
    });
}
