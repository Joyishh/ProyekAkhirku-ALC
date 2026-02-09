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

export const register = async (req, res) => {
    try {
        const { username, email, password, confPassword } = req.body;

        if (!username || !email || !password || !confPassword) {
            return res.status(400).json({ 
                message: "Semua field harus diisi (username, email, password, confPassword)" 
            });
        }

        if (password !== confPassword) {
            return res.status(400).json({ 
                message: "Password dan konfirmasi password tidak cocok" 
            });
        }

        if (password.length < 8) {
            return res.status(400).json({ 
                message: "Password minimal 8 karakter" 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Format email tidak valid" 
            });
        }

        const existingUsername = await Users.findOne({
            where: { username: username }
        });
        if (existingUsername) {
            return res.status(400).json({ 
                message: "Username sudah digunakan" 
            });
        }

        const existingEmail = await Users.findOne({
            where: { email: email }
        });
        if (existingEmail) {
            return res.status(400).json({ 
                message: "Email sudah terdaftar" 
            });
        }

        const hashedPassword = await argon2.hash(password);

        await Users.create({
            username: username,
            email: email,
            password: hashedPassword,
            role_id: 3
        });

        return res.status(201).json({ 
            message: "Registrasi berhasil, silakan login" 
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ 
            message: "Terjadi kesalahan pada server",
            error: error.message 
        });
    }
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
