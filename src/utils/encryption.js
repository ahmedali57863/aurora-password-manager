import CryptoJS from 'crypto-js';

// App-wide key for things that need to be readable by the app but hidden from casual view (like the user list)
// This value is no longer hardcoded. It is read from environment variables.
// For vite (client): set VITE_APP_SECRET_KEY in your .env
// For Node/SSR scripts: set APP_SECRET_KEY or VITE_APP_SECRET_KEY in process.env
// NOTE: storing a static app-wide secret in client builds is visible to users — prefer per-user keys when possible.
export const APP_SECRET_KEY = (() => {
    // prefer Vite env (client builds)
    try {
        if (typeof import !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_APP_SECRET_KEY) {
            return import.meta.env.VITE_APP_SECRET_KEY;
        }
    } catch (e) {
        // import.meta may be unavailable in some environments — ignore
    }

    // fallback to Node environment variables (useful for server-side scripts)
    try {
        if (typeof process !== 'undefined' && process.env) {
            return process.env.APP_SECRET_KEY || process.env.VITE_APP_SECRET_KEY || null;
        }
    } catch (e) {
        // not running in Node-style environment
    }

    console.warn('APP_SECRET_KEY is not set. Set VITE_APP_SECRET_KEY in .env (for vite) or APP_SECRET_KEY in process.env for server environments.');
    return null;
})();

export const encryptData = (data, secretKey = APP_SECRET_KEY) => {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    } catch (error) {
        console.error("Encryption failed:", error);
        return null;
    }
};

export const decryptData = (ciphertext, secretKey = APP_SECRET_KEY) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        // If decryption fails, it might be legacy plain text data.
        // Try to parse it directly as a fallback.
        try {
            return JSON.parse(ciphertext);
        } catch (e) {
            console.error("Decryption failed:", error);
            return null;
        }
    }
};

export const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

