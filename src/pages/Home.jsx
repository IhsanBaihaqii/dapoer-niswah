import ProductSection from "../components/ProductSection";
import ContactSection from "../components/ContactSection";
import Logo from "../../assets/img/logo.png";
import Toko from "../../assets/img/dapoer-niswah.png";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-[var(--color-coklat)] relative overflow-hidden"
      >
        {/* Background Patterns */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(245, 197, 24, 0.04) 40px, rgba(245, 197, 24, 0.04) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(245, 197, 24, 0.04) 40px, rgba(245, 197, 24, 0.04) 41px)",
          }}
        ></div>
        <div className="absolute w-[600px] h-[600px] border border-[var(--color-kuning)]/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute w-[900px] h-[900px] border border-[var(--color-kuning)]/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-kuning)]/10 border border-[var(--color-kuning)]/30 text-[var(--color-kuning)] text-xs tracking-[3px] uppercase px-5 py-2 rounded-md mb-8">
            <i className="fa-solid fa-seedling"></i> Sehat Tanpa Obat
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-black text-[var(--color-krem)] mb-6 leading-tight">
            Dapoer <em className="text-[var(--color-kuning)] italic">Niswah</em>
          </h1>

          {/* logo */}
          <img
            src={Logo}
            alt="Logo Dapoer Niswah"
            className="w-24 md:w-36 lg:w-48 xl:w-56 h-auto mb-6"
          />

          <div className="w-16 h-1 bg-[var(--color-kuning)] mb-6"></div>

          <p className="text-lg md:text-xl text-[var(--color-coklat-muda)] mb-6 font-light tracking-wide">
            Warisan Leluhur, Khasiat Terpercaya
          </p>

          <p className="text-[var(--color-krem)]/70 text-sm md:text-base leading-relaxed mb-12 max-w-lg">
            Jamu tradisional pilihan dari bahan rempah alami terbaik. Merawat
            kesehatan dan kecantikan dengan cara yang sesungguhnya — seperti
            yang dilakukan nenek moyang kita.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#produk"
              className="bg-[var(--color-kuning)] text-[var(--color-coklat)] px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all hover:bg-[var(--color-kuning-deep)] hover:-translate-y-1 shadow-[0_8px_28px_rgba(245,197,24,0.3)]"
            >
              <i className="fa-solid fa-cart-shopping mr-2"></i> Lihat Produk
            </a>
            <a
              href="https://wa.me/6285370473784"
              target="_blank"
              rel="noreferrer"
              className="bg-transparent border-2 border-[var(--color-coklat-muda)]/50 text-[var(--color-coklat-muda)] px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all hover:border-[var(--color-kuning)] hover:text-[var(--color-kuning)] hover:-translate-y-1"
            >
              <i className="fa-brands fa-whatsapp mr-2"></i> Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN SECTION */}
      <section id="keunggulan" className="py-24 px-6 bg-[var(--color-krem)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-[var(--color-orange)] bg-[var(--color-orange)]/10 border border-[var(--color-orange)]/20 px-4 py-1.5 rounded mb-4">
              <i className="fa-solid fa-star"></i> Mengapa Memilih Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-coklat)] mb-6">
              Kualitas{" "}
              <span className="text-[var(--color-kuning-deep)]">Tanpa</span>{" "}
              <em className="italic text-[var(--color-coklat-muda)]">
                Kompromi
              </em>
            </h2>
            <p className="text-[var(--color-coklat-mid)] leading-relaxed text-sm md:text-base">
              Setiap produk dibuat dengan penuh cinta menggunakan bahan rempah
              segar pilihan, tanpa bahan pengawet berbahaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "fa-leaf",
                title: "Bahan Alami 100%",
                desc: "Dipilih langsung dari kebun rempah segar, tanpa campuran bahan kimia berbahaya.",
              },
              {
                icon: "fa-mortar-pestle",
                title: "Resep Tradisional",
                desc: "Diolah menggunakan resep turun-temurun yang telah terbukti khasiatnya selama generasi.",
              },
              {
                icon: "fa-shield-halved",
                title: "Higienis & Terjamin",
                desc: "Proses produksi bersih dan higienis memastikan kualitas setiap tetes jamu kami.",
              },
              {
                icon: "fa-truck-fast",
                title: "Pengiriman Cepat",
                desc: "Tersedia pengiriman ke seluruh Indonesia. Pesan hari ini, segera tiba di tangan Anda.",
              },
              {
                icon: "fa-tags",
                title: "Harga Terjangkau",
                desc: "Kesehatan bukan kemewahan. Kami hadir dengan harga yang bersahabat untuk semua kalangan.",
              },
              {
                icon: "fa-heart",
                title: "Pelayanan Tulus",
                desc: "Konsultasi gratis, melayani dengan sepenuh hati untuk kesehatan keluarga Anda.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[var(--color-putih)] p-8 rounded-2xl border-2 border-[var(--color-krem-dark)] hover:border-[var(--color-kuning)] transition-colors text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-[var(--color-krem)] border border-[var(--color-krem-dark)] rounded-full flex items-center justify-center text-2xl text-[var(--color-coklat-muda)] group-hover:bg-[var(--color-kuning)] group-hover:text-[var(--color-coklat)] transition-colors mb-6">
                  <i className={`fa-solid ${feature.icon}`}></i>
                </div>
                <h3 className="font-bold text-lg text-[var(--color-coklat)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-coklat-mid)] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-24 px-6 bg-[var(--color-coklat)] border-t border-[var(--color-kuning)]/20"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-[var(--color-kuning)]/5 border-2 border-[var(--color-kuning)]/20 rounded-xl h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center relative overflow-hidden p-4">
            <img
              src={Toko}
              alt="Toko Dapoer Niswah"
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute -bottom-4 -right-4 bg-[var(--color-kuning)] text-[var(--color-coklat)] px-6 py-4 font-serif font-bold text-sm tracking-widest uppercase shadow-lg">
              Sejak Generasi
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-[var(--color-kuning)] bg-[var(--color-kuning)]/10 border border-[var(--color-kuning)]/20 px-4 py-1.5 rounded mb-6">
              <i className="fa-solid fa-book-open"></i> Cerita Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-kuning)] mb-8 leading-tight">
              Tentang{" "}
              <em className="italic text-[var(--color-orange-light)]">
                Dapoer
              </em>{" "}
              <span className="text-[var(--color-kuning-deep)]">Niswah</span>
            </h2>
            <div className="space-y-4 text-[var(--color-krem)]/70 text-sm md:text-base leading-relaxed mb-10">
              <p>
                Jamu Dapoer Niswah adalah UMKM yang bergerak di bidang minuman
                kesehatan tradisional, didirikan pada 27 Maret 2017 oleh Niswah
                Lestari. Berawal dari kepedulian untuk menghadirkan minuman
                herbal yang praktis, higienis, dan tetap autentik.
              </p>
              <p>
                Setiap produk kami dibuat dengan tangan yang teliti, menggunakan
                rempah-rempah segar pilihan dari petani lokal. Tidak ada bahan
                pengawet, tidak ada pewarna buatan — hanya kebaikan alam yang
                murni untuk keluarga Anda.
              </p>
            </div>

            <div className="flex border border-[var(--color-kuning)]/20 rounded-lg overflow-hidden">
              <div className="flex-1 p-5 text-center border-r border-[var(--color-kuning)]/20">
                <span className="block font-serif text-3xl font-black text-[var(--color-kuning)]">
                  60+
                </span>
                <span className="text-[10px] text-[var(--color-coklat-muda)] uppercase tracking-widest mt-1 block">
                  Varian Produk
                </span>
              </div>
              <div className="flex-1 p-5 text-center border-r border-[var(--color-kuning)]/20">
                <span className="block font-serif text-3xl font-black text-[var(--color-kuning)]">
                  10K+
                </span>
                <span className="text-[10px] text-[var(--color-coklat-muda)] uppercase tracking-widest mt-1 block">
                  Pelanggan
                </span>
              </div>
              <div className="flex-1 p-5 text-center">
                <span className="block font-serif text-3xl font-black text-[var(--color-kuning)]">
                  100%
                </span>
                <span className="text-[10px] text-[var(--color-coklat-muda)] uppercase tracking-widest mt-1 block">
                  Alami
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUK SECTION */}
      <ProductSection />

      {/* TESTIMONI SECTION */}
      <section id="testimoni" className="py-24 px-6 bg-[var(--color-putih)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-[var(--color-orange)] bg-[var(--color-orange)]/10 border border-[var(--color-orange)]/20 px-4 py-1.5 rounded mb-4">
              <i className="fa-solid fa-comments"></i> Kata Mereka
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-coklat)] mb-6">
              Testimoni{" "}
              <em className="italic text-[var(--color-coklat-muda)]">
                Pelanggan
              </em>{" "}
              <span className="text-[var(--color-kuning-deep)]">Kami</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                text: "Sudah 3 bulan minum Induk Kunyit Jahe Merah dari Dapoer Niswah, badan terasa lebih fit dan jarang sakit. Rasanya enak, tidak terlalu pahit!",
                name: "Ibu Sari W.",
                loc: "Marelan",
              },
              {
                text: "Kunyit Asam-nya segar banget! Cocok diminum sehari-hari. Harga juga terjangkau dibanding yang lain. Recommended banget!",
                name: "Mbak Rini A.",
                loc: "Marelan",
              },
              {
                text: "Jamu Bersalin-nya membantu pemulihan pasca melahirkan. Terima kasih Dapoer Niswah, sudah jadi teman setia di masa nifas saya!",
                name: "Bunda Dewi P.",
                loc: "Medan",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-[var(--color-krem)] p-8 rounded-2xl border border-[var(--color-krem-dark)] shadow-sm"
              >
                <div className="text-[var(--color-kuning-deep)] text-lg mb-4">
                  ★★★★★
                </div>
                <p className="text-[var(--color-coklat-mid)] text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-kuning)] flex items-center justify-center text-[var(--color-coklat)] font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-coklat)] text-sm">
                      {t.name}
                    </div>
                    <div className="text-[10px] text-[var(--color-coklat-muda)] uppercase tracking-wider">
                      📍 {t.loc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact SECTION */}
      <ContactSection />
    </div>
  );
}
