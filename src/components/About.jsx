import React from 'react'
import logo from '../assets/LOGO/AURORA VAULT.png'
import { FaShieldAlt, FaLock, FaBolt, FaUserSecret } from 'react-icons/fa'

const About = () => {
    return (
        <>
            {/* Background - Same as Manager/Login */}
            <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto text-white flex flex-col items-center">

                {/* Hero Section */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <img
                        src={logo}
                        alt="Aurora Vault"
                        className="w-48 md:w-64 mx-auto mb-8 drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                    />
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                        Secure. Simple. Futuristic.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Aurora Vault is a next-generation password manager designed for those who value both security and aesthetics.
                        We believe managing your digital identity should be an experience, not a chore.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">

                    {/* Card 1: Local Storage */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] group">
                        <div className="bg-purple-500/20 p-4 rounded-2xl w-fit mb-6 group-hover:bg-purple-500/30 transition-colors">
                            <FaShieldAlt className="text-3xl text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-purple-200">Client-Side Security</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Your passwords never leave your device. Aurora Vault uses your browser's local storage to keep your credentials safe and accessible only to you.
                        </p>
                    </div>

                    {/* Card 2: Privacy */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] group">
                        <div className="bg-cyan-500/20 p-4 rounded-2xl w-fit mb-6 group-hover:bg-cyan-500/30 transition-colors">
                            <FaUserSecret className="text-3xl text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-cyan-200">Total Privacy</h3>
                        <p className="text-gray-400 leading-relaxed">
                            We don't track you. We don't sell your data. In fact, we don't even see your data. You are in complete control of your digital vault.
                        </p>
                    </div>

                    {/* Card 3: Speed */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] group">
                        <div className="bg-pink-500/20 p-4 rounded-2xl w-fit mb-6 group-hover:bg-pink-500/30 transition-colors">
                            <FaBolt className="text-3xl text-pink-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-pink-200">Lightning Fast</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Built with modern web technologies for instant access. No loading spinners, no lag. Just your passwords, right when you need them.
                        </p>
                    </div>

                </div>

                {/* Footer / Quote */}
                <div className="mt-20 text-center opacity-60">
                    <p className="italic text-lg font-light">"The only truly secure system is one that is powered by you."</p>
                    <p className="mt-4 text-sm font-bold tracking-widest text-purple-400">MUHAMMAD AHMED AMJAD</p>
                </div>

            </div>
        </>
    )
}

export default About
