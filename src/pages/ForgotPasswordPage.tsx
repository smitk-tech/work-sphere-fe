import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Mail, ArrowLeft, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import loginBg from '../assets/images/login-background.jpg'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/newpassword',
        })

        setLoading(false)
        if (error) {
            alert(error.message)
        } else {
            setMessage('Check your email for the password reset link.')
        }
    }

    return (
        <div
            className="flex justify-center items-center min-h-screen w-full bg-cover bg-center font-sans relative bg-gray-900"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="bg-white/75 backdrop-blur-[20px] p-12 rounded-[24px] shadow-xl border border-white/20 w-full max-w-[420px] text-center flex flex-col gap-6">

                <div className="bg-white w-[50px] h-[50px] rounded-xl flex items-center justify-center mx-auto shadow-sm text-2xl text-gray-800">
                    <Send size={24} />
                </div>

                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h1>
                    <p className="text-sm text-gray-500 leading-relaxed mx-0">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {message ? (
                    <div className="bg-green-100 text-green-800 p-4 rounded-xl text-sm font-medium">
                        {message}
                    </div>
                ) : (
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
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

                        <button
                            type="submit"
                            className="w-full p-3.5 bg-gray-900 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-black hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-700 font-medium hover:underline">
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>
            </div>
        </div>
    )
}
