import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCart, cartCount } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-[var(--color-coklat)] border-b-4 border-[var(--color-kuning)]">
      <Link
        to="/"
        className="flex items-center gap-2 text-[var(--color-kuning)] font-serif text-2xl font-bold decoration-transparent no-underline"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-kuning)]"></div>
        <span>
          Dapoer{" "}
          <span className="text-[var(--color-orange-light)] italic">
            Niswah
          </span>
        </span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        <li>
          <a
            href="/#home"
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] text-sm font-bold uppercase tracking-wider transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/#keunggulan"
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] text-sm font-bold uppercase tracking-wider transition-colors"
          >
            Keunggulan
          </a>
        </li>
        <li>
          <a
            href="/#about"
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] text-sm font-bold uppercase tracking-wider transition-colors"
          >
            Tentang
          </a>
        </li>
        <li>
          <a
            href="/#produk"
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] text-sm font-bold uppercase tracking-wider transition-colors"
          >
            Produk
          </a>
        </li>
        <li>
          <a
            href="/#testimoni"
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] text-sm font-bold uppercase tracking-wider transition-colors"
          >
            Testimoni
          </a>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleCart}
          className="flex items-center gap-2 bg-[var(--color-kuning)] hover:bg-[var(--color-kuning-deep)] text-[var(--color-coklat)] px-4 py-2 rounded-lg font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-md relative"
        >
          <i className="fa-solid fa-basket-shopping"></i>
          <span className="hidden md:inline">Keranjang</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[var(--color-orange)] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-[var(--color-kuning)] rounded-full transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[var(--color-kuning)] rounded-full transition-opacity ${isOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[var(--color-kuning)] rounded-full transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--color-coklat)] border-b-4 border-[var(--color-kuning)] p-6 flex flex-col gap-4 md:hidden shadow-xl">
          <a
            href="/#home"
            onClick={() => setIsOpen(false)}
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] font-bold uppercase tracking-wider text-sm"
          >
            Home
          </a>
          <a
            href="/#keunggulan"
            onClick={() => setIsOpen(false)}
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] font-bold uppercase tracking-wider text-sm"
          >
            Keunggulan
          </a>
          <a
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] font-bold uppercase tracking-wider text-sm"
          >
            Tentang
          </a>
          <a
            href="/#produk"
            onClick={() => setIsOpen(false)}
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] font-bold uppercase tracking-wider text-sm"
          >
            Produk
          </a>
          <a
            href="/#testimoni"
            onClick={() => setIsOpen(false)}
            className="text-[var(--color-kuning-pale)] hover:text-[var(--color-kuning)] font-bold uppercase tracking-wider text-sm"
          >
            Testimoni
          </a>
        </div>
      )}
    </nav>
  );
}
