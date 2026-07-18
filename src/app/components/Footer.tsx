import { Instagram, Mail, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="bg-stone-950 text-stone-400 py-16 px-6 border-t border-stone-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-light text-stone-100 tracking-widest uppercase mb-2">Cold Case</h4>
          <p className="text-sm text-stone-500">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>

        <div className="flex gap-6">
          <a href="#" aria-label="Instagram" className="hover:text-stone-100 transition-colors text-stone-500"><Instagram /></a>
          <a href="#" aria-label="Twitter / X" className="hover:text-stone-100 transition-colors text-stone-500"><Twitter /></a>
          <a href="#" aria-label="YouTube" className="hover:text-stone-100 transition-colors text-stone-500"><Youtube /></a>
          <a href="mailto:booking@coldcase.com" aria-label="Email" className="hover:text-stone-100 transition-colors text-stone-500"><Mail /></a>
        </div>

        <div className="text-center md:text-right text-sm text-stone-500">
          <p>Booking & Management</p>
          <a href="mailto:booking@coldcase.com" className="text-stone-200 hover:text-white transition-colors">
            booking@coldcase.com
          </a>
        </div>
      </div>
    </footer>
  );
}
