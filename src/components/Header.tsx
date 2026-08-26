"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MagnetPairIcon } from "./illustrations";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/o-que-e-o-biomagnetismo", label: "O que é o Biomagnetismo" },
  { href: "/tratamentos", label: "Tratamentos" },
  { href: "/contactos", label: "Contactos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/10 bg-[var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-amber-800">
          <MagnetPairIcon className="h-9 w-9" />
          <span className="text-lg font-semibold tracking-tight">
            Clínica Equilíbrio Bio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber-700 ${
                pathname === link.href ? "text-amber-800" : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/marcar"
            className="rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-800"
          >
            Marcar Consulta
          </Link>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-amber-900" />
          <span className="h-0.5 w-6 bg-amber-900" />
          <span className="h-0.5 w-6 bg-amber-900" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-amber-900/10 px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-stone-700 hover:bg-amber-50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/marcar"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-amber-700 px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Marcar Consulta
          </Link>
        </nav>
      )}
    </header>
  );
}
