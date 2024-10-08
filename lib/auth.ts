import * as SecureStore from "expo-secure-store";

export const hashPassword = async (password: string) => {
    return `-***-|${password}|-***-`;
}

export const generateToken = async (userId: string, email: string) => {
    return `***${userId}***${email}***${process.env.JWT_SECRET}***`;
}


export const verifyPassword = async (hashed: string, pass: string) => {
    const step1 = hashed.split("|");

    if (step1.length !== 3) {
        return false;
    }

    return step1[1] === pass;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
}