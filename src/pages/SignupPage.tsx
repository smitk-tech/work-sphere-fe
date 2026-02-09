import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Eye, EyeOff, Github, Facebook, Chrome, AlertCircle, ArrowRight, User, Users, ShieldCheck, ChevronDown, Lock, Mail, UserPlus, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { authService } from '../services/auth.service'

// Background image import
import loginBg from '../assets/images/login-background.jpg'

type Role = 'employee' | 'department_head' | 'admin' | null;

interface RoleCardProps {
    role: Role;
    title: string;
    icon: LucideIcon;
    selected: boolean;
    onSelect: (role: Role) => void;
}

const RoleCard = ({ role, title, icon: Icon, selected, onSelect }: RoleCardProps) => (
    <button
        type="button"
        onClick={() => onSelect(role)}
        className={`flex-1 flex flex-col items-center justify-center p-6 rounded-[24px] border transition-all duration-300 gap-4 group ${selected
            ? 'bg-blue-50 border-blue-500 shadow-lg ring-1 ring-blue-500 scale-[1.02]'
            : 'bg-white/60 border-white/50 hover:bg-white hover:border-gray-200 hover:shadow-md'
            }`}
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${selected ? 'bg-blue-500 text-white rotate-3' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-200'}`}>
            <Icon size={28} />
        </div>
        <span className={`text-base font-bold transition-colors ${selected ? 'text-blue-900' : 'text-gray-500 group-hover:text-gray-800'}`}>
            {title}
        </span>
    </button>
)

export default function SignupPage() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [selectedRole, setSelectedRole] = useState<Role>(null)
    const [userId, setUserId] = useState<string | null>(null)

    // Step 3: Personal Details States
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage(null)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        setLoading(false)
        if (error) {
            setErrorMessage(error.message)
        } else if (data.user) {
            setUserId(data.user.id)
            setStep(2)
        }
    }

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage(null)

        if (!userId) {
            setErrorMessage('User ID not found. Please try signing up again.')
            setLoading(false)
            return
        }

        try {
            await authService.signup({
                id: userId,
                email: email,
                firstName: firstName,
                lastName: lastName,
                number: number,
                address: address,
                state: state,
                city: city,
                zipCode: zipCode,
                role: selectedRole || undefined,
            });

            setSuccessMessage('Registration completed successfully! Welcome to WorkSphere.');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : (error as { response?: { data?: { message?: string } } })?.response?.data?.message
                || 'Something went wrong. Please try again.';
            setErrorMessage(errorMessage);
        } finally {
            setLoading(false);
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

            <div className={`bg-white/80 backdrop-blur-[24px] p-8 rounded-[32px] shadow-2xl border border-white/40 w-full transition-all duration-500 relative z-10 m-4 ${step === 3 ? 'max-w-[800px]' : 'max-w-[440px]'}`}>
                {/* Top Progress Indicator */}
                <div className="flex gap-2 mb-8 justify-center">
                    <div className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-blue-600 shadow-sm' : 'bg-gray-200/50'}`} />
                    <div className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-blue-600 shadow-sm' : 'bg-gray-200/50'}`} />
                    <div className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${step >= 3 ? 'bg-blue-600 shadow-sm' : 'bg-gray-200/50'}`} />
                </div>

                {step === 1 && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-500 text-center">
                        <div className="bg-white w-[56px] h-[56px] rounded-2xl flex items-center justify-center mx-auto shadow-md text-gray-800 mb-2">
                            <UserPlus size={28} className="text-gray-900" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
                            <p className="text-sm text-gray-500 font-medium">Join WorkSphere today</p>
                        </div>

                        {errorMessage && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                                <p className="text-[0.85rem] font-medium text-red-900 whitespace-pre-wrap">{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="flex flex-col gap-4">
                            <div className="relative flex items-center group">
                                <Mail className="absolute left-4 text-gray-400 w-[18px] h-[18px] transition-colors group-focus-within:text-gray-900" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full py-3.5 px-4 pl-11 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-gray-900/10 shadow-inner"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative flex items-center group">
                                <Lock className="absolute left-4 text-gray-400 w-[18px] h-[18px] transition-colors group-focus-within:text-gray-900" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create password"
                                    className="w-full py-3.5 px-4 pl-11 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-gray-900/10 shadow-inner"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 text-gray-400 hover:text-gray-800 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full p-4 bg-gray-900 text-white rounded-xl text-[0.95rem] font-bold transition-all duration-300 hover:bg-black hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:opacity-70 mt-4 group flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        Continue
                                        <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="flex flex-col gap-6 mt-2 border-gray-900/10">
                            <div className="flex items-center text-gray-400 text-[0.7rem] uppercase tracking-widest gap-4 before:content-[''] before:flex-1 before:h-[1px] before:bg-gray-900/10 after:content-[''] after:flex-1 after:h-[1px] after:bg-gray-900/10 font-bold">
                                Or continue with
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center bg-white/60 border border-white/50 rounded-2xl p-3.5 hover:bg-white transition-all shadow-sm hover:-translate-y-[2px] hover:shadow-md group" onClick={() => handleOAuthSignup('google')}>
                                    <Chrome className="text-gray-600 group-hover:text-blue-500" size={24} />
                                </button>
                                <button className="flex-1 flex items-center justify-center bg-white/60 border border-white/50 rounded-2xl p-3.5 hover:bg-white transition-all shadow-sm hover:-translate-y-[2px] hover:shadow-md group" onClick={() => handleOAuthSignup('facebook')}>
                                    <Facebook className="text-gray-600 group-hover:text-blue-600" size={24} fill="currentColor" />
                                </button>
                                <button className="flex-1 flex items-center justify-center bg-white/60 border border-white/50 rounded-2xl p-3.5 hover:bg-white transition-all shadow-sm hover:-translate-y-[2px] hover:shadow-md group" onClick={() => handleOAuthSignup('github')}>
                                    <Github className="text-gray-600 group-hover:text-gray-900" size={24} fill="currentColor" />
                                </button>
                            </div>

                            <Link to="/login" className="text-sm text-gray-500 font-medium hover:text-gray-900 transition-colors">
                                Already have an account? <span className="font-bold underline underline-offset-4">Sign In</span>
                            </Link>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Select your role</h2>
                            <p className="text-sm text-gray-500 font-medium">Choose your usage preference</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex gap-4">
                                <RoleCard
                                    role="employee"
                                    title="I'm Employee"
                                    icon={User}
                                    selected={selectedRole === 'employee'}
                                    onSelect={setSelectedRole}
                                />
                                <RoleCard
                                    role="department_head"
                                    title="I'm Dept Head"
                                    icon={Users}
                                    selected={selectedRole === 'department_head'}
                                    onSelect={setSelectedRole}
                                />
                            </div>
                            <RoleCard
                                role="admin"
                                title="I'm Admin"
                                icon={ShieldCheck}
                                selected={selectedRole === 'admin'}
                                onSelect={setSelectedRole}
                            />
                        </div>

                        <button
                            onClick={() => setStep(3)}
                            disabled={!selectedRole}
                            className="w-full p-4 bg-gray-900 text-white rounded-xl text-[0.95rem] font-bold transition-all duration-300 hover:bg-black hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:opacity-40 shadow-sm flex items-center justify-center gap-2 group"
                        >
                            Continue
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Personal Details</h1>
                            <p className="text-sm text-gray-500 font-medium">Complete your profile</p>
                        </div>

                        <form onSubmit={handleFinalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">First name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    className="w-full py-3 px-4 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none focus:bg-white focus:border-gray-900/10 shadow-inner"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Last name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    className="w-full py-3 px-4 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none focus:bg-white focus:border-gray-900/10 shadow-inner"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Mobile number <span className="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    placeholder="Enter number"
                                    className="w-full py-3 px-4 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none focus:bg-white focus:border-gray-900/10 shadow-inner"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Address <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter address"
                                    className="w-full py-3 px-4 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none focus:bg-white focus:border-gray-900/10 shadow-inner"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">State <span className="text-gray-400 normal-case">(optional)</span></label>
                                <div className="relative">
                                    <select
                                        className="w-full py-3 px-4 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none focus:bg-white focus:border-gray-900/10 shadow-inner appearance-none"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <option value="">Select state</option>
                                        <option value="CA">California</option>
                                        <option value="NY">New York</option>
                                        <option value="TX">Texas</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">City <span className="text-gray-400 normal-case">(optional)</span></label>
                                <div className="relative">
                                    <select
                                        className="w-full py-3 px-4 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none focus:bg-white focus:border-gray-900/10 shadow-inner appearance-none"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    >
                                        <option value="">Select city</option>
                                        <option value="LA">Los Angeles</option>
                                        <option value="NYC">New York City</option>
                                        <option value="HOU">Houston</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 md:col-span-2">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Zip code <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter zip code"
                                    className="w-full py-3 px-4 border border-white/50 bg-white/40 rounded-xl text-[0.95rem] text-gray-900 outline-none focus:bg-white focus:border-gray-900/10 shadow-inner"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 flex flex-col gap-6 mt-4">
                                <p className="text-[0.8rem] text-gray-500 font-medium leading-relaxed text-center">
                                    By signing up, I accept the <button type="button" className="text-gray-900 font-bold hover:underline">Terms of Service</button> and acknowledge the <button type="button" className="text-gray-900 font-bold hover:underline">Privacy Policy</button>.
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full p-4 bg-gray-900 text-white rounded-xl text-[0.95rem] font-bold transition-all duration-300 hover:bg-black hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Processing...' : 'Complete Registration'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl flex items-start gap-3 mt-6 animate-in fade-in slide-in-from-top-2">
                        <ArrowRight className="text-green-600 shrink-0 rotate-[135deg] mt-1" size={20} />
                        <p className="text-[0.9rem] font-bold text-green-900">{successMessage}</p>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-900/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest">
                        WorkSphere © 2026
                    </p>
                    <div className="flex gap-6 text-[0.7rem] font-bold text-gray-500">
                        <button className="hover:text-gray-900 transition-colors uppercase tracking-wider">Help</button>
                        <button className="hover:text-gray-900 transition-colors uppercase tracking-wider">Privacy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
