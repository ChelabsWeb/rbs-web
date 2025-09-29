import Link from "next/link";
import { Container } from "./Container";

const NAV_LINKS = [
  { href: "/cine", label: "Cartelera" },
  { href: "/proximamente", label: "Proximamente" },
  { href: "/licencias", label: "Licencias" },
  { href: "/prensa", label: "Prensa" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-glass-cinema-backdrop/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm uppercase tracking-widest text-glass-cinema-text"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-glass-cinema-primary text-base font-bold text-gray-950 shadow-glass">
            R
          </span>
          <span className="font-semibold">RBS Distribuidora</span>
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
