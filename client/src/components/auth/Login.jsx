// src/components/auth/LoginForm.jsx
import React, { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { toast } from "react-hot-toast"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
  const { login, isloading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    let loadingToast
    try {
      loadingToast = toast.loading("Logging in...")
      const response = await login({ email, password })

      if (response?.user) {
        toast.success("Welcome back ✨", { id: loadingToast })
        await new Promise((r) => setTimeout(r, 500))
        
        console.log(response)
        // Check subscription status and redirect accordingly
        const subscriptionStatus = response.subscriptionStatus;
        const planCheckResult = response.planCheckResult;
        
        if (subscriptionStatus && (subscriptionStatus.plan === 'expired' || planCheckResult?.wasExpired)) {
          // Redirect to plans page for expired subscriptionsm
          toast.error("Plan Expired. Please renew it soon..")
          navigate('/plans')
        } else if (subscriptionStatus && !subscriptionStatus.isActive) {
          // Redirect to plans page for inactive subscriptions
          toast.error("Plan Expired. Please renew it soon..")
            navigate('/plans')
        } else {
          // Normal flow for active users
          navigate("/join-meeting")
        }
      } else {
        setEmail("")
        setPassword("")
        toast.error("User not found", { id: loadingToast })
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed", {
        id: loadingToast
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-gradient-to-b from-orange-50 via-amber-50 to-white">

      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Continue your conscious journey
          </p>
        </div>

        {/* Card */}
        <div className="relative bg-white/80 backdrop-blur-xl
                        rounded-3xl shadow-[0_40px_80px_-25px_rgba(0,0,0,0.15)]
                        border border-gray-200/60 overflow-hidden">

          {/* Soft Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60
                          bg-orange-300/20 rounded-full blur-3xl" />

          <div className="relative px-8 py-10">
            <form onSubmit={submit} className="space-y-6">

              {/* Email */}
              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl
                           border border-gray-200
                           focus:ring-2 focus:ring-orange-400
                           focus:border-transparent"
              />

              {/* Password */}
              <div>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl
                             border border-gray-200
                             focus:ring-2 focus:ring-orange-400
                             focus:border-transparent"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="text-sm text-orange-500 hover:text-orange-600 transition"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={isloading}
                className="w-full py-3 rounded-full
                           bg-orange-500 text-white
                           font-semibold tracking-wide
                           shadow-lg shadow-orange-300/40
                           hover:scale-[1.02] transition"
              >
                {isloading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Footer */}
              <p className="text-center text-sm text-gray-600 pt-4">
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/auth/register")}
                  className="font-medium text-orange-500 cursor-pointer hover:underline"
                >
                  Create one
                </span>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
