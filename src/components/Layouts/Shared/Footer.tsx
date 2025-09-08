import Logo from "@/assets/icons/logo";
import { socialLinks } from "@/constants/socialLinks";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="w-full mx-auto px-6 py-6 shadow flex flex-col items-center justify-between gap-6 md:gap-10">
      {/* Logo */}
      <Logo />
      {/* Social Links */}
      <div className="flex gap-6">
        {socialLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <img src={link.logo} alt={link.name} />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} All rights reserved by{" "}
        <span className="font-semibold">Md Ranit Rubbyat Sultan</span>
      </p>
    </div>
  );
};

export default Footer;
