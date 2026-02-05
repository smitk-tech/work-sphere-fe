import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Eye, EyeOff, Lock, Mail, UserPlus, Github, Facebook, Chrome, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

// Background image import
import loginBg from '../assets/images/login-background.jpg'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage(null)
        setSuccessMessage(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        setLoading(false)
        if (error) {
            setErrorMessage(error.message)
        } else {
            setSuccessMessage('Registration successful! Please check your email for a verification link.')
        }
    }

    const handleOAuthSignup = async (provider: 'google' | 'facebook' | 'github') => {
        setErrorMessage(null)
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin + '/login'
            }
        })
        if (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <div
            className="flex justify-center items-center min-h-screen w-full bg-cover bg-center font-sans relative bg-gray-900 overflow-hidden"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

            <div className="bg-white/80 backdrop-blur-[24px] p-10 rounded-[32px] shadow-2xl border border-white/40 w-full max-w-[440px] text-center flex flex-col gap-6 relative z-10 m-4">

                <div className="bg-white w-[56px] h-[56px] rounded-2xl flex items-center justify-center mx-auto shadow-md text-gray-800">
                    <UserPlus size={28} className="text-gray-900" />
                </div>

                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-sm text-gray-500 leading-relaxed px-4">Join WorkSphere and start collaborating today.</p>
                </div>

                {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                        <p className="text-[0.85rem] font-medium text-red-900 leading-tight">{errorMessage}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-start gap-3 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="bg-green-500 rounded-full p-0.5 mt-0.5">
                            <ArrowRight className="text-white shrink-0 rotate-[135deg]" size={14} />
                        </div>
                        <p className="text-[0.85rem] font-medium text-green-900 leading-tight">{successMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <div className="relative flex items-center group">
                        <Mail className="absolute left-4 text-gray-400 w-[18px] h-[18px] transition-colors group-focus-within:text-gray-900" />
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full py-3.5 px-4 pl-11 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-gray-900/10 focus:shadow-sm placeholder-gray-500 shadow-inner"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative flex items-center group">
                        <Lock className="absolute left-4 text-gray-400 w-[18px] h-[18px] transition-colors group-focus-within:text-gray-900" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create Password"
                            className="w-full py-3.5 px-4 pl-11 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-gray-900/10 focus:shadow-sm placeholder-gray-500 shadow-inner"
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

                    <button
                        type="submit"
                        className="w-full p-4 bg-gray-900 text-white border-none rounded-xl text-[0.95rem] font-bold cursor-pointer transition-all duration-300 hover:bg-black hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : (
                            <>
                                Sign Up
                                <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors hover:underline underline-offset-4">
                    <ArrowLeft size={16} />
                    Already have an account? Sign In
                </Link>

                <div className="flex items-center text-gray-400 text-[0.7rem] uppercase tracking-widest gap-4 my-2 before:content-[''] before:flex-1 before:h-[1px] before:bg-gray-900/10 after:content-[''] after:flex-1 after:h-[1px] after:bg-gray-900/10 font-bold">
                    Or sign up with
                </div>

                <div className="flex gap-4 justify-between">
                    <button className="flex-1 flex items-center justify-center bg-white/60 border border-white/50 rounded-2xl p-3.5 cursor-pointer transition-all duration-300 shadow-sm hover:bg-white hover:-translate-y-[2px] hover:shadow-md hover:border-blue-500/20 group" onClick={() => handleOAuthSignup('google')}>
                        <Chrome className="text-gray-600 group-hover:text-blue-500 transition-colors" size={24} />
                    </button>

                    <button className="flex-1 flex items-center justify-center bg-white/60 border border-white/50 rounded-2xl p-3.5 cursor-pointer transition-all duration-300 shadow-sm hover:bg-white hover:-translate-y-[2px] hover:shadow-md hover:border-blue-600/20 group" onClick={() => handleOAuthSignup('facebook')}>
                        <Facebook className="text-gray-600 group-hover:text-blue-600 transition-colors" size={24} fill="currentColor" />
                    </button>

                    <button className="flex-1 flex items-center justify-center bg-white/60 border border-white/50 rounded-2xl p-3.5 cursor-pointer transition-all duration-300 shadow-sm hover:bg-white hover:-translate-y-[2px] hover:shadow-md hover:border-gray-900/20 group" onClick={() => handleOAuthSignup('github')}>
                        <Github className="text-gray-600 group-hover:text-gray-900 transition-colors" size={24} fill="currentColor" />
                    </button>
                </div>

                <p className="text-xs text-gray-500 mt-2 font-medium">
                    By joining, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}
