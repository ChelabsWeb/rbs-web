import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-glass-cinema-backdrop/90 py-12 text-sm text-glass-cinema-text-muted">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-glass-cinema-text">RBS Distribuidora</p>
          <p>Montevideo, Uruguay</p>
        </div>
        <div className="flex gap-4">
          <Link href="/contacto" className="hover:text-glass-cinema-primary">
            Contacto
          </Link>
          <Link href="/prensa" className="hover:text-glass-cinema-primary">
            Prensa
          </Link>
          <Link href="/licencias" className="hover:text-glass-cinema-primary">
            Licencias
          </Link>
        </div>
      </Container>
    </footer>
  );
}
