import jwt from "jsonwebtoken";
import { createUser, getUserByUserName } from "../models/user.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// import Customer from "../models/customer.model.js";
import { Request, Response } from "express";

dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'secret'

export async function register(req: Request, res: Response): Promise<void> {
    try {
        const { userName, password } = req.body;
        const user = await getUserByUserName(userName)
        if (user) {
            res.status(400).json({ message: "User Already exists" })
        } else {
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = await createUser({ name: userName, password_hash: passwordHash })
            res.status(201).json({
                message: "User created successfully",
                user: user
            })
        }
    } catch (error) {
        res.status(500)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const user = await getUserByUserName(userName)

        if (!user) {
            res.status(200).json({ message: "Invalid user name or password" })
        } else {
            // const passwordMatch = await bcrypt.compare(password, user.password_hash)
            const passwordMatch = password == user.password_hash ? true : false
            if (!passwordMatch) {
                return res
                    .status(200)
                    .json({ message: "Invalid username or password" });
            } else {
                const token = jwt.sign(
                    { userName: userName },
                    accessTokenSecret,
                    { expiresIn: "1h", }
                );
                const refreshToken = jwt.sign(
                    { userName: user.name },
                    accessTokenSecret,
                    { expiresIn: "1d", }
                );
                return res.json({
                    userName: user.name,
                    token,
                    refreshToken,
                });
            }
        }
    } catch (error) {
        res.status(500).send();
    }
};

// export const refreshToken = async (req, res) => {
//     let refreshToken = req.body?.refreshToken || req.cookies?.refresh;
//     if (!refreshToken) {
//         return res.status(403).json({ message: "No refresh token" });
//     }
//     User.findOne({ where: { refresh_token: refreshToken } }).then((user) => {
//         if (!user) {
//             return res.status(403).json({ message: "Invalid refresh token" });
//         }
//         // verify refresh token
//         jwt.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET,
//             (err, user) => {
//                 if (err) {
//                     return res.status(403).json({ message: "Invalid token" });
//                 } else {
//                     // Create new access token
//                     const newToken = jwt.sign(
//                         { email: user.email },
//                         process.env.ACCESS_TOKEN_SECRET,
//                         {
//                             expiresIn: "1h",
//                         }
//                     );
//                     res.json({ message: "new token created", token: newToken });
//                 }
//             }
//         );
//     });
// };

// export const logout = async (req, res) => {
//     const refreshToken = req.body.refreshToken;
//     User.findOne({ where: { refresh_token: refreshToken } }).then((user) => {
//         if (!user) {
//             return res.status(403).json({ message: "Invalid refresh token" });
//         }
//         User.update(
//             { refresh_token: null },
//             { where: { refresh_token: refreshToken } }
//         ); // need to handle exception here
//         res.clearCookie("refresh");
//         res.status(201).json({ message: "Logged out successfully" });
//     });
// };
