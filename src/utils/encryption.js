import CryptoJS from 'crypto-js';
let _appSecret = null;
try {
    // import.meta.env is available in Vite's module environment. Use optional chaining so esbuild can parse it.
    // This will be replaced at build-time by Vite; wrap in try/catch to avoid runtime errors outside module environments.
    _appSecret = (import.meta && import.meta.env && import.meta.env.VITE_APP_SECRET_KEY) || null;
} catch (e) {
    // import.meta may be unavailable in certain environments — ignore
}

if (!_appSecret) {
    try {
        if (typeof process !== 'undefined' && process.env) {
            _appSecret = process.env.APP_SECRET_KEY || process.env.VITE_APP_SECRET_KEY || null;
        }
    } catch (e) {
        // not running in Node-like environment
    }
}

if (!_appSecret) {
    // warn once at runtime if a key isn't set; builds may still succeed but encryption will be no-op
    // We intentionally avoid throwing here so deployment/build doesn't fail, but encryption functions will
    // gracefully return null when secret absent.
    console.warn('APP_SECRET_KEY is not set. Set VITE_APP_SECRET_KEY in .env (for vite) or APP_SECRET_KEY in process.env for server environments.');
}

export const APP_SECRET_KEY = _appSecret;

export const encryptData = (data, secretKey = APP_SECRET_KEY) => {
    if (!secretKey) {
        console.error('encryptData: missing secret key, will not encrypt');
        return null;
    }

    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    } catch (error) {
        console.error("Encryption failed:", error);
        return null;
    }
};

export const decryptData = (ciphertext, secretKey = APP_SECRET_KEY) => {
    if (!secretKey) {
        // If there is no key, try to parse the ciphertext directly (it may be legacy plain JSON) before giving up.
        try {
            return JSON.parse(ciphertext);
        } catch (e) {
            console.error('decryptData: missing secret key and ciphertext is not plain JSON');
            return null;
        }
    }

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

