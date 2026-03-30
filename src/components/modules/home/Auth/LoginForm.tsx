'use client'

import { useState, useEffect, useActionState } from "react"
import { motion } from "framer-motion"
import { EyeIcon, EyeOffIcon } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/services/auth/loginUser"
import { Toast } from "@/components/shared/Toast/Toast"

interface SignInProps {
  redirect?: string
}

const LoginForm: React.FC<SignInProps> = ({
  redirect,
}) => {
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, isPending] = useActionState(loginUser, null)
  const [isLoading, setIsLoading] = useState(false)
  // Sync server pending → parent loader
  useEffect(() => {
    if (state && !state.success && state.message) {
      Toast.fire({
        icon: "error",
        title: state?.message || "Login failed",
      });
    }
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);


  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      {/* Mobile illustration peek */}
      <div className="lg:hidden flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF5EC] to-[#FFECD2] flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
            <rect
              x="12"
              y="16"
              width="24"
              height="26"
              rx="3"
              fill="#E8731A"
            />
            <path
              d="M19 16V12Q19 6 24 6Q29 6 29 12V16"
              stroke="#C45A10"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="24" cy="28" r="4" fill="white" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Sign In
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Enter your details below.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">

        {redirect && (
          <input type="hidden" name="redirect" value={redirect} />
        )}

        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>

          <Input
            name="email"
            type="email"
            placeholder="you@example.com" className={`w-full px-4 py-6 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]'}`}
            required
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">

          <Label>Password</Label>

          <div className="relative">

            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className={`w-full px-4 py-6 pr-11 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]'}`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </button>

          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>
          )}

        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded accent-[#E8731A]"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <a
            href="#"
            className="text-sm text-[#E8731A] font-medium hover:underline"
          >
            Forgot password?
          </a>
        </div>
        {/* Login Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-6 bg-[#E8731A] text-white text-sm tracking-wide font-semibold rounded-lg hover:bg-[#d4670f] transition-colors duration-300 mt-1 shadow-lg shadow-[#E8731A]/20"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </Button>

        {/* Divider */}
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

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{' '}
          <button
            className="text-[#E8731A] font-semibold hover:underline"
          >
            Create Account
          </button>
        </p>

      </form>
    </motion.div>
  )
}

export default LoginForm