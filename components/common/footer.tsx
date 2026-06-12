import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/20 backdrop-blur-xl bg-gradient-to-r from-[#302196] to-[#23186f] dark:from-[#10112A] dark:to-[#0A0B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-14">

        {/* Brand — full width on mobile */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 dark:text-white">
            Summarix
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-md text-gray-300 dark:text-slate-400 max-w-xs">
            AI-powered PDF summarization to help you save time and boost productivity.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-base sm:text-xl text-gray-200 dark:text-white mb-2 sm:mb-3">
            Product
          </h3>
          <ul className="flex flex-col space-y-2 sm:space-y-3 text-sm sm:text-md text-gray-300 dark:text-slate-400">
            <li><Link href="/#pricing" className="hover:text-indigo-400 dark:hover:text-slate-300 transition-colors">Pricing</Link></li>
            <li><Link href="/upload" className="hover:text-indigo-400 dark:hover:text-slate-300 transition-colors">Upload PDF</Link></li>
            <li><Link href="/dashboard" className="hover:text-indigo-400 dark:hover:text-slate-300 transition-colors">Your Summaries</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-base sm:text-xl text-gray-200 dark:text-white mb-2 sm:mb-3">
            Company
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-md text-gray-300 dark:text-slate-400">
            <li className="hover:text-indigo-400 dark:hover:text-slate-300 cursor-pointer transition-colors">About</li>
            <li className="hover:text-indigo-400 dark:hover:text-slate-300 cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-indigo-400 dark:hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-semibold text-base sm:text-xl text-gray-200 dark:text-white mb-2 sm:mb-3">
            Connect
          </h3>
          <div className="flex space-x-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-purple-100 dark:bg-slate-800 hover:bg-purple-200 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 dark:text-slate-300" />
            </div>
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-purple-100 dark:bg-slate-800 hover:bg-purple-200 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 dark:text-slate-300" />
            </div>
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-purple-100 dark:bg-slate-800 hover:bg-purple-200 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 dark:text-slate-300" />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center py-3 sm:py-4 text-xs sm:text-sm text-gray-200 dark:text-slate-500">
        © {new Date().getFullYear()} Summarix. All rights reserved.
      </div>
    </footer>
  );
}