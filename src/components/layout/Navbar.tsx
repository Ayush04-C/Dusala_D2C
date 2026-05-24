// src/components/layout/Navbar.tsx
// Floating capsule navbar — transparent with white text at top, morphs into a
// frosted-glass pill shape on scroll. Premium luxury feel inspired by Masterclass.
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  // Trigger capsule transition once user scrolls past the hero fold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        // When scrolled: add top padding so the capsule floats below the edge
        isScrolled ? "py-3 px-4 md:px-8" : "py-4 px-6"
      )}
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500 ease-out",
          isScrolled
            ? // ── Capsule state: frosted glass pill ──
              "max-w-5xl bg-white/20 backdrop-blur-xl shadow-lg shadow-black/10 rounded-full px-6 py-5"
            : // ── Hero state: full-width transparent ──
              "max-w-7xl bg-transparent rounded-none px-0 py-0"
        )}
      >
        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className={cn(
            "text-2xl font-heading font-bold transition-colors duration-300",
            isScrolled ? "text-brand-rose" : "text-white"
          )}
        >
          Dushala
        </Link>

        {/* ── Desktop Nav Links ──────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {/* Nav links with pill hover effect */}
          {[
            { href: "/student/courses", label: "Courses" },
            { href: "/pricing", label: "Pricing" },
            { href: "/about", label: "About" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                isScrolled
                  ? "text-brand-dark/80 hover:text-brand-dark hover:bg-brand-rose/10"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div
            className={cn(
              "w-px h-5 mx-2 transition-colors duration-300",
              isScrolled ? "bg-brand-dark/15" : "bg-white/25"
            )}
          />

          {/* Auth CTA */}
          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/student/dashboard">
                <Button
                  size="sm"
                  className={cn(
                    "rounded-full px-5 text-sm font-medium transition-all duration-300",
                    isScrolled
                      ? "bg-brand-rose text-white hover:bg-brand-rose/90"
                      : "bg-white/15 text-white border border-white/30 hover:bg-white/25"
                  )}
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </div>
          ) : isLoaded ? (
            <SignInButton mode="modal">
              <Button
                size="sm"
                className={cn(
                  "rounded-full px-6 text-sm font-semibold transition-all duration-300",
                  isScrolled
                    ? "bg-brand-gold text-white hover:bg-brand-gold/90 shadow-md shadow-brand-gold/20"
                    : "bg-brand-gold text-white hover:bg-brand-gold/90"
                )}
              >
                Enroll Now
              </Button>
            </SignInButton>
          ) : null}
        </div>

        {/* ── Mobile Toggle ─────────────────────────────────────────────── */}
        <button
          className={cn(
            "md:hidden p-2 rounded-full transition-all duration-300",
            isScrolled
              ? "text-brand-dark hover:bg-brand-rose/10"
              : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile Dropdown ──────────────────────────────────────────────── */}
      {/* Slides down as a capsule card below the nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-400 ease-out",
          isMobileMenuOpen
            ? "max-h-80 opacity-100 mt-2"
            : "max-h-0 opacity-0 mt-0"
        )}
      >
        <div
          className="mx-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-5 flex flex-col gap-1"
          role="menu"
        >
          {[
            { href: "/student/courses", label: "Courses" },
            { href: "/pricing", label: "Pricing" },
            { href: "/about", label: "About" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-dark font-medium py-2.5 px-4 rounded-xl hover:bg-brand-rose/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-brand-dark/10 my-1" />

          {isLoaded && isSignedIn ? (
            <Link
              href="/student/dashboard"
              className="text-brand-rose font-semibold py-2.5 px-4 rounded-xl hover:bg-brand-rose/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              Dashboard
            </Link>
          ) : isLoaded ? (
            <SignInButton mode="modal">
              <Button className="w-full bg-brand-gold text-white rounded-xl mt-1 hover:bg-brand-gold/90">
                Enroll Now
              </Button>
            </SignInButton>
          ) : null}
        </div>
      </div>
    </header>
  );
}
