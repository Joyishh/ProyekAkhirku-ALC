import Users from "../models/userModel.js";
import argon2 from "argon2";
import { Sequelize } from "sequelize";

export const registerUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password tidak sama" });
    }

    try {
        const existingUser = await Users.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { username },
                    { email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword,
            role_id: 4
        });

        res.status(201).json({ message: "User registered successfully", userId: newUser.user_id });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};