import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO/AURORA VAULT.png'
import { encryptData, decryptData, hashPassword } from '../utils/encryption'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Try to get users, decrypting if necessary using APP_SECRET_KEY (default)
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? (decryptData(storedUsers) || []) : [];

        if (isLogin) {
            // Hash the input password to compare with stored hash
            const inputHash = hashPassword(formData.password);
            const user = users.find(u => u.username === formData.username && u.password === inputHash)

            if (user) {
                // We need to store the RAW password in the session so Manager.jsx can use it as the key.
                // But we encrypt this session object with the APP_SECRET_KEY so it's not plain text in localStorage.
                // The 'user' object from storage only has the hash, so we reconstruct the session user.
                const sessionUser = { ...user, password: formData.password }; // Store RAW password for encryption key

                localStorage.setItem('currentUser', encryptData(sessionUser))
                navigate('/manager')
            } else {
                alert('Invalid credentials')
            }
        } else {
            if (users.find(u => u.username === formData.username)) {
                alert('Username already exists')
                return
            }
            // Store HASHED password in the database (users list)
            const newUser = { ...formData, password: hashPassword(formData.password) }
            users.push(newUser)
            // Encrypt the entire users array before saving (using default APP_SECRET_KEY)
            localStorage.setItem('users', encryptData(users))
            alert('Account created successfully! Please login.')
            setIsLogin(true)
            setFormData({ username: '', password: '' })
        }
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="h-full mt-16 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-black/20 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                    <div className="flex justify-center mb-8">
                        <img src={logo} alt="Aurora Vault" className="w-48 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    </div>

                    <h2 className="text-2xl font-bhlingglers hover:text-purple-700 mb-6 text-center text-yellow-100/40">
                        {isLogin ? 'Welcome To Aurora Vault' : 'Create Account'}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="border border-white/20 bg-black/40 w-full p-4 text-white placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="border border-white/20 bg-black/40 w-full p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                            required
                        />

                        <button type="submit" className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-purple-400 hover:text-purple-300 font-semibold underline decoration-transparent hover:decoration-purple-300 transition-all"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
