"use client";

import { useState, useEffect, useActionState } from "react";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { Toast } from "@/components/shared/Toast/Toast";

interface SignInProps {
  redirect?: string;
}

const LoginForm: React.FC<SignInProps> = ({ redirect }) => {
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(loginUser, null);

  const [isLoading, setIsLoading] = useState(false);

  //  Handle state change properly
  useEffect(() => {
    if (state) {
      console.log("LOGIN STATE:", state);

      if (!state.success) {
        Toast.fire({
          icon: "error",
          title: state?.message || "Login failed",
        });
      } else {
        Toast.fire({
          icon: "success",
          title: state?.message || "Login successful",
        });

        // optional redirect
        if (state.redirect) {
          window.location.href = state.redirect;
        }
      }
    }

    setIsLoading(isPending);
  }, [state, isPending]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
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
            placeholder="you@example.com"
            required
            className={`w-full px-4 py-6 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.email
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
              placeholder="Enter your password"
              required
              className={`w-full px-4 py-6 pr-11 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]"
              }`}
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
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Remember + Forgot */}
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

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-6 bg-[#E8731A] text-white text-sm font-semibold rounded-lg hover:bg-[#d4670f] transition mt-1 shadow-lg shadow-[#E8731A]/20"
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

        {/* Google */}
        <button
          type="button"
          className="w-full py-3 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-3"
        >
          Google
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <button className="text-[#E8731A] font-semibold hover:underline">
            Create Account
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginForm;