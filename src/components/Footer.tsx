import { useTranslation } from "react-i18next";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Navn med gradient */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-extrabold text-white">
            Sterner Solutions
          </h1>
        </div>

        {/* Links */}
        {/* 
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#about" className="hover:text-white transition">
            Om os
          </a>
          <a href="#services" className="hover:text-white transition">
            Services
          </a>
          <a href="#contact" className="hover:text-white transition">
            Kontakt
          </a>
        </div>
        */}

        {/* Sociale ikoner */}
        <div className="flex space-x-4 text-xl">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <SiGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <SiLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <SiX />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sterner Solutions. {t("copyright")}
      </div>
    </footer>
  );
}

export default Footer;
