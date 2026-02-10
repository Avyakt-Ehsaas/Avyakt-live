import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope
} from "react-icons/fa";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FAFAF8] text-stone-800">

      {/* Top calm divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 py-20 text-center">

        {/* Brand */}
        <h2 className="text-3xl font-semibold tracking-tight">
          Avyakt <span className="text-orange-500">Ehsaas</span>
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-sm text-stone-600 leading-relaxed">
          A mindful space for inner stillness — blending meditation,
          neuroscience, and ancient wisdom to help you reconnect with
          yourself.
        </p>

        {/* Navigation */}
        <nav className="mt-10">
          <ul className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            {[
              "Home",
              "About",
              "Programs",
              "Testimonials",
              "Contact"
            ].map((item, i) => (
              <li
                key={i}
                className="hover:text-orange-500 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="mt-10 flex justify-center gap-6 text-lg">
          {[FaInstagram, FaLinkedinIn, FaTwitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="hover:text-orange-500 transition"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Legal */}
        <div className="mt-14 pt-8 border-t border-stone-300 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>
            © {new Date().getFullYear()} Avyakt Ehsaas
          </p>

          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-orange-500 transition">
              Terms
            </Link>

            <Link
              to="/privacy"
              className="flex items-center gap-2 hover:text-orange-500 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              Privacy
            </Link>

            <div className="flex items-center gap-2">
              <FaEnvelope />
              support@avyaktehsaas.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
