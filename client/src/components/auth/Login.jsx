import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        console.log("API Base URL:", API_BASE_URL) ||
          `${API_BASE_URL}/auth/login`,
        { email, password }
      );

      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("hasCompletedOnboarding", "true");
      navigate("/live-sessions");
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = () => {
    try {
      localStorage.setItem("hasCompletedOnboarding", "true");
      window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
    } catch (err) {
      console.log(err);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
  <div className="py-4 min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
  <div className="w-full max-w-[420px]">
    <div className="text-center mb-4">
      <div className="inline-flex items-center gap-2">
               <span className="subheading text-greenbase font-season-medium font-med">
          Avyakt-Ehsaas
        </span>
      </div>

      <h1 className="text-primary font-dm heading-large font-med text-center ">
        Welcome back
      </h1>

      <p className="paragraph-secondary font-dm text-gray text-center mt-2">
        Continue your healing journey.
      </p>
    </div>

    <form 
    onSubmit={handleLogin}
    className="space-y-3">

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-14 px-5 rounded-2xl
                   border border-[#EAEAEA]
                   bg-white
                   font-dm
                   focus:outline-none
                   focus:border-[#2D4D3A]"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-14 px-5 rounded-2xl
                   border border-[#EAEAEA]
                   bg-white
                   font-dm
                   focus:outline-none
                   focus:border-[#2D4D3A]"
      />

      <div className="text-right">
        <button
          type="button"
          className="text-sm text-[#6B7280]"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="bg-[#71AC61]  w-full text-white font-medium font-dm px-4 py-4 rounded-full hover:bg-[#4F7944] transition-all duration-300 cursor-pointer"
      >
        Continue
      </button>
    </form>

    <div className="my-4 flex items-center">
      <div className="flex-1 h-px bg-[#EAEAEA]" />
      <span className="px-4 text-sm text-gray-400">
        or
      </span>
      <div className="flex-1 h-px bg-[#EAEAEA]" />
    </div>

    <button
      onClick={handleGoogleLogin}
      className="w-full h-14 rounded-2xl
                 border border-[#EAEAEA]
                 bg-white
                 font-dm
                  hover:bg-[#F7F8F4]
                 flex items-center justify-center gap-3"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
      <p className="text-center pargaraph-secondary text-gray font-dm mt-6">
          Already have an account?{' '}
          <Link to="/auth/register" className="text-greenbase italic font-smbold cursor-pointer hover:underline">
            Sign in
          </Link>
        </p>
  </div>
</div>
  );
}