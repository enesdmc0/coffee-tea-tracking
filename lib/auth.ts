import * as SecureStore from "expo-secure-store";
import * as crypto from 'expo-crypto';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return `-***-|${password}|-***-`;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
};

export const generateToken = async (userId: string, email: string): Promise<string> => {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const data = `${userId}|${email}|${jwtSecret}`;
    const hash = await crypto.digestStringAsync(
        crypto.CryptoDigestAlgorithm.SHA256,
        data
    );

    return `${userId}.${hash}`;
};

export const verifyPassword = async (hashed: string, pass: string) => {
    const step1 = hashed.split("|");

    if (step1.length !== 3) {
        return false;
    }

    return step1[1] === pass;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const logout = async (): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync("userToken");
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};

// Yardımcı fonksiyon: Token'ı güvenli bir şekilde kaydetmek için
export const saveToken = async (token: string): Promise<void> => {
    try {
        await SecureStore.setItemAsync("userToken", token);
    } catch (error) {
        console.error("Error saving token:", error);
        throw error;
    }
};

// Yardımcı fonksiyon: Kaydedilmiş token'ı almak için
export const getToken = async (): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync("userToken");
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
};