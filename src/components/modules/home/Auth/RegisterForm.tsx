'use client'

import { useActionState, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { registerUser } from "@/services/auth/registerUser"
import { Toast } from "@/components/shared/Toast/Toast"

type FormErrors = {
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
}

type ActionState = {
    success?: boolean
    message?: string
} | null

const RegisterForm = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [showPassword, setShowPassword] = useState(false)

  const [state, formAction, isPending] = useActionState(registerUser, null);

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        if (state && !state.success && state.message) {
            Toast.fire({
                icon: "error",
                title: state.message || "Register failed",
            })
        }

        if (state && state.success) {
            Toast.fire({
                icon: "success",
                title: state.message || "Account created",
            })
        }

        setIsLoading(isPending)

    }, [state, isPending])



    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
        >

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    Create Account
                </h1>

                <p className="text-muted-foreground">
                    Join our platform and start shopping.
                </p>
            </div>

            <form action={formAction}  className="flex flex-col gap-5">

                {/* Name */}
                <div className="space-y-2">
                    <Label>Full Name</Label>

                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter your full name"    
                        className={`w-full px-4 py-6 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors.name
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]"
                            }`}
                    />

                    {errors.name && (
                        <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label>Email</Label>

                    <Input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`w-full px-4 py-6 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors.email
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]"
                            }`}
                    />

                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label>Password</Label>

                    <div className="relative">
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create password"
                            className={`w-full px-4 py-6 pr-11 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors.password
                                ? "border-red-300 focus:ring-red-200"
                                : "border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]"
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                            {showPassword
                                ? <EyeOffIcon className="w-4 h-4" />
                                : <EyeIcon className="w-4 h-4" />}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label>Confirm Password</Label>

                    <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        
                        className={`w-full px-4 py-6 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]"
                            }`}
                    />

                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-6 bg-[#E8731A] text-white text-sm tracking-wide font-semibold rounded-lg hover:bg-[#d4670f] transition-colors duration-300 shadow-lg shadow-[#E8731A]/20"
                >
                    {isPending ? "Creating..." : "Create Account"}
                </Button>

                <div className="flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs text-muted-foreground">
                        or continue with
                    </span>
                    <Separator className="flex-1" />
                </div>

                {/* Google Button */}
                <button className="w-full cursor-pointer py-3 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Google
                </button>
            </form>
        </motion.div>
    )
}

export default RegisterForm