import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Eye, EyeOff, Lock, Mail, LogIn, Github, Facebook, Chrome } from 'lucide-react'

// Background image import (assuming Vite handles this correctly)
import loginBg from '../assets/images/login-background.jpg'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        setLoading(false)
        console.log(error)
        if (error) alert(error.message)
        else alert('Signed up! Check your email --- if verification is enabled.')
    }

    const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'github') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
        })
        if (error) alert(error.message)
    }

    return (
        <div
            className="flex justify-center items-center min-h-screen w-full bg-cover bg-center font-sans relative bg-gray-900"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            {/* Overlay for better contrast if needed, but original CSS didn't have it explicitly besides backdrop-filter on card */}
            <div className="bg-white/75 backdrop-blur-[20px] p-12 rounded-[24px] shadow-xl border border-white/20 w-full max-w-[420px] text-center flex flex-col gap-6">

                <div className="bg-white w-[50px] h-[50px] rounded-xl flex items-center justify-center mx-auto shadow-sm text-2xl text-gray-800">
                    <LogIn size={24} />
                </div>

                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in with email</h1>
                    <p className="text-sm text-gray-500 leading-relaxed mx-0">Make a new doc to bring your words, data, and teams together. For free</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="relative flex items-center">
                        <Mail className="absolute left-4 text-gray-400 w-[18px] h-[18px]" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full py-3.5 px-4 pl-11 border border-transparent bg-white/60 rounded-xl text-[0.95rem] text-gray-800 outline-none transition-all duration-200 focus:bg-white focus:border-black/10 focus:shadow-sm placeholder-gray-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative flex items-center">
                        <Lock className="absolute left-4 text-gray-400 w-[18px] h-[18px]" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full py-3.5 px-4 pl-11 border border-transparent bg-white/60 rounded-xl text-[0.95rem] text-gray-800 outline-none transition-all duration-200 focus:bg-white focus:border-black/10 focus:shadow-sm placeholder-gray-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-4 cursor-pointer border-none bg-transparent text-gray-400 hover:text-gray-800 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <a href="#" className="text-right text-[0.8125rem] text-gray-700 font-medium -mt-2 cursor-pointer hover:underline">Forgot password?</a>

                    <button
                        type="submit"
                        className="w-full p-3.5 bg-gray-900 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-black hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Get Started'}
                    </button>
                </form>

                <div className="flex items-center text-gray-400 text-xs gap-4 my-2 before:content-[''] before:flex-1 before:h-[1px] before:bg-black/10 after:content-[''] after:flex-1 after:h-[1px] after:bg-black/10">
                    Or sign in with
                </div>

                <div className="flex gap-4 justify-between">
                    <button className="flex-1 flex items-center justify-center bg-white border border-black/5 rounded-xl p-3 cursor-pointer transition-all duration-200 shadow-sm hover:-translate-y-[2px] hover:shadow-md" onClick={() => handleOAuthLogin('google')}>
                        <Chrome className="text-blue-500" size={24} />
                    </button>

                    <button className="flex-1 flex items-center justify-center bg-white border border-black/5 rounded-xl p-3 cursor-pointer transition-all duration-200 shadow-sm hover:-translate-y-[2px] hover:shadow-md" onClick={() => handleOAuthLogin('facebook')}>
                        <Facebook className="text-blue-600" size={24} fill="currentColor" />
                    </button>

                    <button className="flex-1 flex items-center justify-center bg-white border border-black/5 rounded-xl p-3 cursor-pointer transition-all duration-200 shadow-sm hover:-translate-y-[2px] hover:shadow-md" onClick={() => handleOAuthLogin('github')}>
                        <Github className="text-gray-900" size={24} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    )
}
