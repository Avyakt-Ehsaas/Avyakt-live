// src/components/auth/RegisterForm.jsx
import React, { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { toast } from "react-hot-toast"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import Loader from "../ui/Loader"

export default function RegisterForm() {
  const { isloading, register: registerUser } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()

    if (password !== confirm) {
      toast.error("Passwords do not match")
      return
    }

    const loadingToast = toast.loading("Creating your account…")
    setLoading(true)

    try {
      const responseData = await registerUser({
        name,
        email,
        password
      })

      const { message, success } = responseData

      if (success) {
        toast.success(message || "Account created ✨", { id: loadingToast })
        setTimeout(() => navigate("/"), 1000)
      } else {
        toast.error(message || "Registration failed", { id: loadingToast })
      }
    } catch (error) {
      toast.error(
        error?.message || "Something went wrong",
        { id: loadingToast }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-gradient-to-b from-orange-50 via-amber-50 to-white">

      {loading && <Loader />}

      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Begin your conscious transformation
          </p>
        </div>

        {/* Card */}
        <div className="relative bg-white/80 backdrop-blur-xl
                        rounded-3xl shadow-[0_40px_80px_-25px_rgba(0,0,0,0.15)]
                        border border-gray-200/60 overflow-hidden">

          {/* Soft glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60
                          bg-orange-300/20 rounded-full blur-3xl" />

          <div className="relative px-8 py-10">
            <form onSubmit={submit} className="space-y-5">

              {/* Name */}
              <Input
                label="Full name"
                name="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl
                           border border-gray-200
                           focus:ring-2 focus:ring-orange-400
                           focus:border-transparent"
              />

              {/* Email */}
              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl
                           border border-gray-200
                           focus:ring-2 focus:ring-orange-400
                           focus:border-transparent"
              />

              {/* Password */}
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                className="w-full px-4 py-3 rounded-xl
                           border border-gray-200
                           focus:ring-2 focus:ring-orange-400
                           focus:border-transparent"
              />

              {/* Confirm */}
              <Input
                label="Confirm password"
                name="confirm"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl
                           border border-gray-200
                           focus:ring-2 focus:ring-orange-400
                           focus:border-transparent"
              />

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
                    Creating…
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Footer */}
              <p className="text-center text-sm text-gray-600 pt-4">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/auth/login")}
                  className="font-medium text-orange-500 cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
