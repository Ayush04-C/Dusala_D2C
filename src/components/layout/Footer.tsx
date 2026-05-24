// src/components/layout/Footer.tsx
// Footer with brand links, social icons, and newsletter signup.
// Uses inline SVGs for social icons because lucide-react removed brand icons in v1.x

import Link from "next/link";

// ─── Inline SVG Social Icons ──────────────────────────────────────────────────
// Lucide React no longer ships brand icons, so we define them as small components.

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-bold text-brand-gold">SK Business</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Empowering Indian women entrepreneurs through high-impact business coaching and a community of like-minded leaders.
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Instagram" className="text-white/40 hover:text-brand-gold transition-colors"><InstagramIcon size={20} /></Link>
            <Link href="#" aria-label="Facebook" className="text-white/40 hover:text-brand-gold transition-colors"><FacebookIcon size={20} /></Link>
            <Link href="#" aria-label="Twitter" className="text-white/40 hover:text-brand-gold transition-colors"><TwitterIcon size={20} /></Link>
            <Link href="#" aria-label="YouTube" className="text-white/40 hover:text-brand-gold transition-colors"><YoutubeIcon size={20} /></Link>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-heading font-semibold mb-6">Academy</h3>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><Link href="/courses" className="hover:text-brand-gold transition-colors">Browse Courses</Link></li>
            <li><Link href="/pricing" className="hover:text-brand-gold transition-colors">Pricing Plans</Link></li>
            <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-brand-gold transition-colors">Success Stories</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-heading font-semibold mb-6">Support</h3>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><Link href="#" className="hover:text-brand-gold transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-heading font-semibold mb-6">Stay Inspired</h3>
          <p className="text-white/60 text-sm mb-4">Join 5,000+ women entrepreneurs getting weekly business tips.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address for newsletter"
              className="bg-white/10 border-none px-4 py-2 text-sm focus:ring-1 focus:ring-brand-gold rounded-l-md w-full"
            />
            <button className="bg-brand-rose px-4 py-2 rounded-r-md text-sm font-medium hover:bg-brand-rose/90 transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-xs">
        &copy; {new Date().getFullYear()} SK Business Academy. All rights reserved. Made with love for Indian Women.
      </div>
    </footer>
  );
}
