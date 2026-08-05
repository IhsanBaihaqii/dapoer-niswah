export default function Footer() {
  return (
    <footer className="bg-[var(--color-hitam)] text-[var(--color-coklat-muda)] pt-16 px-6 pb-8 border-t-4 border-[var(--color-kuning)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
        <div>
          <h2 className="text-[var(--color-kuning)] font-serif font-black text-2xl mb-4">
            Dapoer Niswah
          </h2>
          <p className="text-[var(--color-coklat-muda)]/70 text-sm leading-relaxed max-w-xs mb-6">
            Jamu tradisional premium dari bahan rempah alami terpilih. Menjaga
            kesehatan keluarga Indonesia dengan cara yang sesungguhnya.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/6285370473784"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[var(--color-kuning)]/10 border border-[var(--color-kuning)]/30 rounded-lg hover:bg-[var(--color-kuning)] hover:text-[var(--color-coklat)] transition-colors text-[var(--color-kuning-pale)]"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
            </a>
            <a
              href="https://instagram.com/dapoer_niswah"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[var(--color-kuning)]/10 border border-[var(--color-kuning)]/30 rounded-lg hover:bg-[var(--color-kuning)] hover:text-[var(--color-coklat)] transition-colors text-[var(--color-kuning-pale)]"
            >
              <i className="fa-brands fa-instagram text-lg"></i>
            </a>
            <a
              href="https://facebook.com/niswah.lestari"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[var(--color-kuning)]/10 border border-[var(--color-kuning)]/30 rounded-lg hover:bg-[var(--color-kuning)] hover:text-[var(--color-coklat)] transition-colors text-[var(--color-kuning-pale)]"
            >
              <i className="fa-brands fa-facebook-f text-lg"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[var(--color-kuning)] text-sm tracking-widest uppercase mb-6 font-bold">
            Navigasi
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="/#"
                className="text-[var(--color-coklat-muda)] hover:text-[var(--color-kuning)] transition-colors text-sm"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/#keunggulan"
                className="text-[var(--color-coklat-muda)] hover:text-[var(--color-kuning)] transition-colors text-sm"
              >
                keunggulan
              </a>
            </li>
            <li>
              <a
                href="/#about"
                className="text-[var(--color-coklat-muda)] hover:text-[var(--color-kuning)] transition-colors text-sm"
              >
                Tentang
              </a>
            </li>
            <li>
              <a
                href="/#produk"
                className="text-[var(--color-coklat-muda)] hover:text-[var(--color-kuning)] transition-colors text-sm"
              >
                Produk
              </a>
            </li>
            <li>
              <a
                href="/#testimoni"
                className="text-[var(--color-coklat-muda)] hover:text-[var(--color-kuning)] transition-colors text-sm"
              >
                Testioni
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--color-kuning)] text-sm tracking-widest uppercase mb-6 font-bold">
            Kontak
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="https://maps.app.goo.gl/4y85oj9aqaYgbtXk9"
                className="flex gap-3 text-sm text-[var(--color-coklat-muda)]/80"
              >
                <i className="fa-solid fa-location-dot mt-1 text-[var(--color-kuning)]"></i>
                <span>
                  Gg. Karya, Rengas Pulau, Kec. Medan Marelan, Kota Medan,
                  Sumatera Utara
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6285370473784"
                className="flex gap-3 text-sm text-[var(--color-coklat-muda)]/80"
              >
                <i className="fa-brands fa-whatsapp mt-1 text-[var(--color-kuning)]"></i>
                <span>+62 853-7047-3784</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-coklat-muda)]/30 pt-6 text-center text-sm text-[var(--color-coklat-muda)]/60">
        © 2026 Dapoer Niswah. Dibuat dengan{" "}
        <i className="fa-solid fa-heart text-[var(--color-kuning)] mx-1"></i>{" "}
        untuk kesehatan Indonesia.
      </div>
    </footer>
  );
}
