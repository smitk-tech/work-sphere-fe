import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Lock, Eye, EyeOff, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import loginBg from '../assets/images/login-background.jpg'

export default function NewPasswordPage() {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.updateUser({
            password: password,
        })

        setLoading(false)
        if (error) {
            alert(error.message)
        } else {
            alert('Password updated successfully!')
            navigate('/login')
        }
    }

    return (
        <div
            className="flex justify-center items-center min-h-screen w-full bg-cover bg-center font-sans relative bg-gray-900"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="bg-white/75 backdrop-blur-[20px] p-12 rounded-[24px] shadow-xl border border-white/20 w-full max-w-[420px] text-center flex flex-col gap-6">

                <div className="bg-white w-[50px] h-[50px] rounded-xl flex items-center justify-center mx-auto shadow-sm text-2xl text-gray-800">
                    <Save size={24} />
                </div>

                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Set New Password</h1>
                    <p className="text-sm text-gray-500 leading-relaxed mx-0">
                        Please enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
                    <div className="relative flex items-center">
                        <Lock className="absolute left-4 text-gray-400 w-[18px] h-[18px]" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
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

                    <button
                        type="submit"
                        className="w-full p-3.5 bg-gray-900 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-black hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}
