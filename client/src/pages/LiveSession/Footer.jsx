import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { ArrowRight, Mail } from "lucide-react";

import FullCTA from "../../assets/images/FullCTA.png";
import DarkLogo from "../../assets/images/LogoDark.svg";
import avyaktFooter from "../../assets/avyakt.png";


const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "The Science", href: "#science" },
      { label: "Programs", href: "#programs" },
      { label: "Pricing", href: "#pricing-section" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Blog", href: "#blog" },
      { label: "FAQs", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

const socialLinks = [
  {
    label: "YouTube",
    href: "#",
    icon: FaYoutube,
  },
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
];

const Footer = () => {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    console.log("Newsletter email:", email);

    event.currentTarget.reset();
  };

  return (
    <>
              
      {/* ================= FOOTER ================= */}
      <footer className="relative overflow-hidden bg-[#152419] text-white">
        {/* Background watermark */}
        <img
          src={avyaktFooter}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-15px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.035] md:w-[1200px]"
        />

        {/* Soft gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(113,172,97,0.16),transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 pb-8 pt-16 md:px-8 md:pt-20">
          {/* Newsletter CTA */}
          <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="max-w-[590px]">
              <p className="font-dm text-[11px] uppercase tracking-[0.25em] text-[#9BC68D] md:text-[12px]">
                Stay connected
              </p>

              <h2 className="mt-4 font-season-medium text-[34px] leading-tight text-white md:text-[48px]">
                Small moments of stillness,
                <span className="block italic text-[#9BC68D]">
                  delivered gently.
                </span>
              </h2>

              <p className="mt-4 max-w-[520px] font-dm text-[14px] leading-7 text-white/60 md:text-[15px]">
                Receive guided practices, mindful reflections and updates from
                the Avyakt community.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="w-full max-w-[540px] lg:justify-self-end"
            >
              <div className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-md sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Mail
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#9BC68D]"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-transparent py-3 font-dm text-[14px] text-white outline-none placeholder:text-white/35"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 rounded-[18px] bg-[#71AC61] px-6 py-4 font-dm text-[13px] font-medium text-white transition-all duration-300 hover:bg-[#82B873]"
                >
                  Join the journey

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              <p className="mt-3 pl-1 font-dm text-[11px] text-white/35">
                Thoughtful emails only. No noise, no spam.
              </p>
            </form>
          </div>

          {/* Main footer */}
          <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_2fr]">
            {/* Brand */}
            <div className="max-w-[350px]">
              <a href="/" className="inline-flex">
                <img
                  src={DarkLogo}
                  alt="Avyakt"
                  className="h-auto w-[110px] brightness-0 invert"
                />
              </a>

              <p className="mt-6 font-dm text-[14px] leading-7 text-white/55">
                A mindful space where neuroscience, meditation and human
                awareness come together to support lasting inner change.
              </p>

              {/* Social */}
              <div className="mt-7 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/65 transition-all duration-300 hover:-translate-y-1 hover:border-[#71AC61] hover:bg-[#71AC61] hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <h3 className="font-dm text-[12px] font-medium uppercase tracking-[0.18em] text-white">
                    {group.title}
                  </h3>

                  <ul className="mt-5 space-y-3.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="font-dm text-[13px] text-white/50 transition-colors duration-300 hover:text-[#9BC68D] md:text-[14px]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-7 font-dm text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between md:text-[12px]">
            <p>© {new Date().getFullYear()} Avyakt. All rights reserved.</p>

            <p className="flex items-center gap-2">
              Designed for mindful living
              <span className="h-1 w-1 rounded-full bg-[#71AC61]" />
              Made with intention
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;