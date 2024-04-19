import { db } from "../config/db.config";

interface User {
    name: string;
    password_hash: string;
}

export async function getUserByUserName(username: string): Promise<User | null> {
    try {
        const user: User = {
            name: username,
            password_hash: "pwd"
        };
        return user;
    } catch (error) {
        return null;
    }
}

export async function createUser(user:User): Promise<User> {
    const newUser: User = {
        name: user.name,
        password_hash: user.password_hash
    };
    return newUser;
}