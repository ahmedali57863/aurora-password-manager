import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaPlus, FaCopy, FaTrash, FaEdit } from 'react-icons/fa'
import logo from '../assets/LOGO/AURORA VAULT.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { encryptData, decryptData } from '../utils/encryption';

const Manager = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [passwordScore, setPasswordScore] = useState(0)
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const currentUserData = localStorage.getItem('currentUser')
        if (!currentUserData) {
            navigate('/')
            return
        }

        // Decrypt session with APP_SECRET_KEY to get the raw password
        const decryptedUser = decryptData(currentUserData)

        if (!decryptedUser) {
            navigate('/')
            return
        }

        setCurrentUser(decryptedUser)

        let passwordsData = localStorage.getItem(`${decryptedUser.username}_passwords`)

        if (passwordsData) {
            // Decrypt vault with USER'S RAW PASSWORD (Master Key)
            const decryptedPasswords = decryptData(passwordsData, decryptedUser.password)

            if (decryptedPasswords) {
                setPasswordArray(decryptedPasswords)
            } else {
                setPasswordArray([])
            }
        }
    }, [])

    const checkStrength = (pass) => {
        let score = 0;
        if (pass.length > 7) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        setPasswordScore(score);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        if (e.target.name === "password") {
            checkStrength(e.target.value)
        }
    }

    const savePassword = () => {
        if (!currentUser) {
            toast.error('Session expired. Please login again.')
            return
        }
        // Basic validation
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            let newPasswordArray;

            if (editingId) {
                // Update existing password
                newPasswordArray = passwordArray.map(item =>
                    item.id === editingId ? { ...form, id: editingId } : item
                )
                setEditingId(null)
                toast.success('Password updated successfully!', { theme: "dark" });
            } else {
                // Add new password
                const id = window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
                newPasswordArray = [...passwordArray, { ...form, id }]
                toast.success('Password saved successfully!', { theme: "dark" });
            }

            setPasswordArray(newPasswordArray)
            // Encrypt vault with USER'S RAW PASSWORD (Master Key)
            localStorage.setItem(`${currentUser.username}_passwords`, encryptData(newPasswordArray, currentUser.password))
            setForm({ site: "", username: "", password: "" })
            setPasswordScore(0)
        } else {
            toast.error('Error: Fields must be at least 3 characters long.')
        }
    }

    const deletePassword = (id) => {
        if (!currentUser) {
            toast.error('Session expired. Please login again.')
            return
        }

        // eslint-disable-next-line no-restricted-globals
        const confirmDelete = confirm("Do you really want to delete this password?")
        if (confirmDelete) {
            const newPasswordArray = passwordArray.filter(item => item.id !== id)
            setPasswordArray(newPasswordArray)
            // Encrypt vault with USER'S RAW PASSWORD (Master Key)
            localStorage.setItem(`${currentUser.username}_passwords`, encryptData(newPasswordArray, currentUser.password))
            toast.info('Password deleted.', { theme: "dark" })
        }
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setEditingId(id)
    }

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="min-h-[calc(100vh-4rem)] pt-32 md:pt-0 flex flex-col md:flex-row items-start justify-center text-white max-w-7xl mx-auto px-4 md:px-8 gap-8 md:gap-16">
                {/* Left Side - Branding */}
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left md:sticky md:top-32">
                    <img
                        src={logo}
                        alt="Aurora Vault Logo"
                        className="w-64 md:w-80 mt-10 lg:w-96 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105"
                    />
                </div>

                {/* Right Side - Form & Table */}
                <div className="w-full md:w-2/3 flex flex-col gap-8 mt-10 md:mt-36">
                    {/* Form Card */}
                    <div className="bg-black/20 p-8 md:p-10 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-center md:text-left bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                            {editingId ? "Update Password" : "Add New Password"}
                        </h2>

                        <div className="flex flex-col gap-5">
                            <input
                                value={form.site}
                                onChange={handleChange}
                                placeholder='Enter website URL'
                                className='rounded-xl border border-white/20 bg-black/40 w-full p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
                                type="text"
                                name="site"
                                id="site"
                            />

                            <div className="flex flex-col md:flex-row gap-5">
                                <input
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder='Enter Username'
                                    className='rounded-xl border border-white/20 bg-black/40 w-full p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
                                    type="text"
                                    name="username"
                                    id="username"
                                />

                                <div className="relative w-full">
                                    <input
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder='Enter Password'
                                        className='rounded-xl border border-white/20 bg-black/40 w-full p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        id="password"
                                    />
                                    <span
                                        className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-purple-500 transition-colors'
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                    >
                                        {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </span>
                                </div>
                                {/* Password Strength Meter */}
                                <div className="w-full flex gap-1 mt-1 h-1">
                                    <div className={`h-full w-1/4 rounded-full transition-all duration-300 ${passwordScore > 0 ? (passwordScore > 1 ? (passwordScore > 2 ? (passwordScore > 3 ? "bg-green-500" : "bg-yellow-400") : "bg-orange-500") : "bg-red-500") : "bg-gray-600"}`}></div>
                                    <div className={`h-full w-1/4 rounded-full transition-all duration-300 ${passwordScore > 1 ? (passwordScore > 2 ? (passwordScore > 3 ? "bg-green-500" : "bg-yellow-400") : "bg-orange-500") : "bg-gray-600"}`}></div>
                                    <div className={`h-full w-1/4 rounded-full transition-all duration-300 ${passwordScore > 2 ? (passwordScore > 3 ? "bg-green-500" : "bg-yellow-400") : "bg-gray-600"}`}></div>
                                    <div className={`h-full w-1/4 rounded-full transition-all duration-300 ${passwordScore > 3 ? "bg-green-500" : "bg-gray-600"}`}></div>
                                </div>
                            </div>

                            <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full px-6 py-3 w-full font-bold text-base transition-all shadow-lg hover:shadow-purple-500/30 active:scale-[0.98] border-2 border-purple-800/30 mt-2'>
                                <FaPlus size={16} />
                                {editingId ? "Update Password" : "Add Password"}
                            </button>
                        </div>
                    </div>

                    {/* Passwords Table */}
                    <div className="bg-black/20 p-6 md:p-8 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6 text-white">Your Passwords</h2>
                        {passwordArray.length === 0 && <div className='text-gray-400 text-center py-4'>No passwords to show</div>}
                        {passwordArray.length !== 0 &&
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full text-left text-white border-collapse">
                                    <thead className='bg-purple-900/40 text-purple-200'>
                                        <tr>
                                            <th className='py-3 px-4 rounded-tl-xl'>Site</th>
                                            <th className='py-3 px-4'>Username</th>
                                            <th className='py-3 px-4'>Password</th>
                                            <th className='py-3 px-4 rounded-tr-xl text-center'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-black/30'>
                                        {passwordArray.map((item, index) => {
                                            return <tr key={index} className='border-b border-white/5 hover:bg-white/5 transition-colors'>
                                                <td className='py-3 px-4'>
                                                    <div className='flex items-center gap-2'>
                                                        <a href={item.site} target='_blank' rel="noreferrer" className='hover:text-purple-400 hover:underline truncate max-w-[150px] block'>{item.site}</a>
                                                        <div className='cursor-pointer text-gray-400 hover:text-white' onClick={() => copyText(item.site)}>
                                                            <FaCopy size={14} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='truncate max-w-[150px] block'>{item.username}</span>
                                                        <div className='cursor-pointer text-gray-400 hover:text-white' onClick={() => copyText(item.username)}>
                                                            <FaCopy size={14} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='truncate max-w-[150px] block'>{"•".repeat(item.password.length)}</span>
                                                        <div className='cursor-pointer text-gray-400 hover:text-white' onClick={() => copyText(item.password)}>
                                                            <FaCopy size={14} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4 text-center'>
                                                    <div className='flex items-center justify-center gap-3'>
                                                        <span className='cursor-pointer text-blue-400 hover:text-blue-300' onClick={() => editPassword(item.id)}>
                                                            <FaEdit size={18} />
                                                        </span>
                                                        <span className='cursor-pointer text-red-400 hover:text-red-300' onClick={() => deletePassword(item.id)}>
                                                            <FaTrash size={18} />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
