// // src/components/auth/RegisterForm.jsx
// import React, { useState } from "react"
// import Input from "../ui/Input"
// import Button from "../ui/Button"
// import { toast } from "react-hot-toast"
// import { useAuth } from "../../hooks/useAuth"
// import { useNavigate } from "react-router-dom"
// import Loader from "../ui/Loader"

// export default function RegisterForm() {
//   const { isloading, register: registerUser } = useAuth()
//   const navigate = useNavigate()

//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirm, setConfirm] = useState("")
//   const [loading, setLoading] = useState(false)

//   const submit = async (e) => {
//     e.preventDefault()

//     if (password !== confirm) {
//       toast.error("Passwords do not match")
//       return
//     }

//     const loadingToast = toast.loading("Creating your account…")
//     setLoading(true)

//     try {
//       const responseData = await registerUser({
//         name,
//         email,
//         password
//       })

//       const { message, success } = responseData

//       if (success) {
//         toast.success(message || "Account created ✨", { id: loadingToast })
//         setTimeout(() => navigate("/"), 1000)
//       } else {
//         toast.error(message || "Registration failed", { id: loadingToast })
//       }
//     } catch (error) {
//       toast.error(
//         error?.message || "Something went wrong",
//         { id: loadingToast }
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4
//                     bg-gradient-to-b from-orange-50 via-amber-50 to-white">

//       {loading && <Loader />}

//       <div className="w-full max-w-md">

//         {/* Heading */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">
//             Create Your Account
//           </h1>
//           <p className="text-gray-600">
//             Begin your conscious transformation
//           </p>
//         </div>

//         {/* Card */}
//         <div className="relative bg-white/80 backdrop-blur-xl
//                         rounded-3xl shadow-[0_40px_80px_-25px_rgba(0,0,0,0.15)]
//                         border border-gray-200/60 overflow-hidden">

//           {/* Soft glow */}
//           <div className="absolute -top-24 -right-24 w-60 h-60
//                           bg-orange-300/20 rounded-full blur-3xl" />

//           <div className="relative px-8 py-10">
//             <form onSubmit={submit} className="space-y-5">

//               {/* Name */}
//               <Input
//                 label="Full name"
//                 name="name"
//                 type="text"
//                 placeholder="Your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 rounded-xl
//                            border border-gray-200
//                            focus:ring-2 focus:ring-orange-400
//                            focus:border-transparent"
//               />

//               {/* Email */}
//               <Input
//                 label="Email address"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 rounded-xl
//                            border border-gray-200
//                            focus:ring-2 focus:ring-orange-400
//                            focus:border-transparent"
//               />

//               {/* Password */}
//               <Input
//                 label="Password"
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 minLength="6"
//                 className="w-full px-4 py-3 rounded-xl
//                            border border-gray-200
//                            focus:ring-2 focus:ring-orange-400
//                            focus:border-transparent"
//               />

//               {/* Confirm */}
//               <Input
//                 label="Confirm password"
//                 name="confirm"
//                 type="password"
//                 placeholder="••••••••"
//                 value={confirm}
//                 onChange={(e) => setConfirm(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 rounded-xl
//                            border border-gray-200
//                            focus:ring-2 focus:ring-orange-400
//                            focus:border-transparent"
//               />

//               {/* Button */}
//               <Button
//                 type="submit"
//                 disabled={isloading}
//                 className="w-full py-3 rounded-full
//                            bg-orange-500 text-white
//                            font-semibold tracking-wide
//                            shadow-lg shadow-orange-300/40
//                            hover:scale-[1.02] transition"
//               >
//                 {isloading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg
//                       className="animate-spin h-4 w-4 text-white"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                       />
//                     </svg>
//                     Creating…
//                   </span>
//                 ) : (
//                   "Create Account"
//                 )}
//               </Button>

//               {/* Footer */}
//               <p className="text-center text-sm text-gray-600 pt-4">
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => navigate("/auth/login")}
//                   className="font-medium text-orange-500 cursor-pointer hover:underline"
//                 >
//                   Sign in
//                 </span>
//               </p>

//             </form>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        {
          fullName: name,
          email: email,
          password: password,
        },
      );

      localStorage.setItem("token", response.data.token);
      toast.success("Registration successful");
      localStorage.setItem("hasCompletedOnboarding", "false");
      navigate("/live-sessions");

    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Registration failed");
      }
    }
  };

const handleGoogleLogin = () => {
  try {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
    localStorage.setItem("hasCompletedOnboarding", "true");
    } catch (error) {
    console.log(error);
    toast.error("Google login failed. Please try again.");
  }
};


 return (
  <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[430px]"
    >
      <div className="text-center mb-6">
     <div className="inline-flex items-center gap-2">
               <span className="subheading text-greenbase font-season-medium font-med">
          Avyakt-Ehsaas
        </span>
      </div>

        <h1 className="text-primary heading-large font-dm font-med text-center">
          Create account
        </h1>

        <p className="text-gray paragraph-secondary font-dm text-center mt-2">
          Begin your peaceful healing journey.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full h-14 font-dm px-5 rounded-2xl border border-[#EAEAEA] bg-white outline-none focus:border-[#2D4D3A]"
          required
        />

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full h-14 px-5 font-dm rounded-2xl border border-[#EAEAEA] bg-white outline-none focus:border-[#2D4D3A]"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create password"
          className="w-full h-14 px-5 font-dm rounded-2xl border border-[#EAEAEA] bg-white outline-none focus:border-[#2D4D3A]"
          required
          minLength="6"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          className="w-full h-14 px-5 font-dm rounded-2xl border border-[#EAEAEA] bg-white outline-none focus:border-[#2D4D3A]"
          required
          minLength="6"
        />

        <button
          type="submit"
          className="w-full h-14 font-dm rounded-2xl bg-[#2D4D3A] text-white font-medium hover:bg-[#243F30] transition"
        >
          Create Account
        </button>
      </form>

      <div className="my-8 flex items-center">
        <div className="flex-1 h-px bg-[#EAEAEA]" />
        <span className="px-4 text-sm text-gray-400">or</span>
        <div className="flex-1 h-px bg-[#EAEAEA]" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full h-14 rounded-2xl border border-[#EAEAEA] bg-white flex items-center justify-center gap-3 hover:bg-[#FDFDFC] transition"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="text-center text-sm text-[#6B7280] mt-8">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-[#2D4D3A] font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  </div>
);
}


