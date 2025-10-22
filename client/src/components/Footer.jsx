import React from "react";
import { Facebook, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 px-4 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
        {/* روابط الصفحات */}
        <div className="flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Contact Us
          </a>
        </div>

        {/* الأيقونات */}
        <div className="flex space-x-6">
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>

          <a
            href="mailto:example@email.com"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>

          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* النص السفلي */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          © 2025 My Lovely Story. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
