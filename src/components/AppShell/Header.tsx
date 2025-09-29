"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "./Container";

const NAV_LINKS = [
  { href: "/cine", label: "Cartelera" },
  { href: "/proximamente", label: "Pr�ximamente" },
  { href: "/licencias", label: "Licencias" },
  { href: "/prensa", label: "Prensa" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-glass-cinema-backdrop/80 shadow-glass backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm uppercase tracking-widest text-glass-cinema-text"
        >
          <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl bg-glass-cinema-primary px-3 text-base font-bold text-gray-950 shadow-glass">
            RBS
          </span>
          <span className="font-semibold">Distribuidora</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-glass-cinema-text-muted sm:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-glass-cinema-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
