// components/ContactSection.jsx
import React, { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    wa: "",
    product: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const sendWA = () => {
    const { name, wa, product, message } = formData;

    if (!name || !wa || !product || !message) {
      alert("Mohon isi semua field yang diperlukan!");
      return;
    }

    const phone = "6285370473784";
    const text = `Halo Dapoer Niswah!%0A%0A*Nama:* ${name}%0A*Nomor WA:* ${wa}%0A*Produk:* ${product}%0A*Pesan:* ${message}%0A%0ATerima kasih!`;
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[var(--color-krem)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-[var(--color-orange)] bg-[var(--color-orange)]/10 border border-[var(--color-orange)]/20 px-4 py-1.5 rounded mb-4">
            <i className="fa-solid fa-envelope"></i> Hubungi Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-coklat)] mb-6">
            Siap{" "}
            <em className="italic text-[var(--color-coklat-muda)]">Melayani</em>{" "}
            <span className="text-[var(--color-kuning-deep)]">Anda</span>
          </h2>
          <p className="text-[var(--color-coklat-mid)] leading-relaxed text-sm md:text-base">
            Punya pertanyaan atau ingin pesan? Kami siap membantu Anda dengan
            senang hati.
          </p>
        </div>

        {/* Grid Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-[var(--color-putih)] p-8 rounded-2xl border-2 border-[var(--color-krem-dark)]">
            <h3 className="text-2xl font-bold text-[var(--color-coklat)] mb-8 flex items-center gap-2">
              Temukan Kami Di Sini
            </h3>

            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[var(--color-krem)] rounded-xl flex items-center justify-center text-xl text-[var(--color-coklat-muda)] group-hover:bg-[var(--color-kuning)] group-hover:text-[var(--color-coklat)] transition-colors shrink-0">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <a
                  href="https://wa.me/6285370473784"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col hover:text-[var(--color-kuning-deep)] transition-colors"
                >
                  <span className="font-semibold text-[var(--color-coklat)]">
                    +62 853-7047-3784
                  </span>
                  <small className="text-[var(--color-coklat-muda)] text-xs">
                    WhatsApp – Chat langsung dengan kami
                  </small>
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[var(--color-krem)] rounded-xl flex items-center justify-center text-xl text-[var(--color-coklat-muda)] group-hover:bg-[var(--color-kuning)] group-hover:text-[var(--color-coklat)] transition-colors shrink-0">
                  <i className="fa-brands fa-instagram"></i>
                </div>
                <a
                  href="https://instagram.com/dapoer_niswah"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col hover:text-[var(--color-kuning-deep)] transition-colors"
                >
                  <span className="font-semibold text-[var(--color-coklat)]">
                    @dapoer_niswah
                  </span>
                  <small className="text-[var(--color-coklat-muda)] text-xs">
                    Instagram – Follow untuk update produk terbaru
                  </small>
                </a>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[var(--color-krem)] rounded-xl flex items-center justify-center text-xl text-[var(--color-coklat-muda)] group-hover:bg-[var(--color-kuning)] group-hover:text-[var(--color-coklat)] transition-colors shrink-0">
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
                <a
                  href="https://facebook.com/niswah.lestari"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col hover:text-[var(--color-kuning-deep)] transition-colors"
                >
                  <span className="font-semibold text-[var(--color-coklat)]">
                    niswah.lestari
                  </span>
                  <small className="text-[var(--color-coklat-muda)] text-xs">
                    Facebook – Temukan kami di Facebook
                  </small>
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[var(--color-krem)] rounded-xl flex items-center justify-center text-xl text-[var(--color-coklat-muda)] group-hover:bg-[var(--color-kuning)] group-hover:text-[var(--color-coklat)] transition-colors shrink-0">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <a
                  href="https://maps.app.goo.gl/4y85oj9aqaYgbtXk9"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col hover:text-[var(--color-kuning-deep)] transition-colors"
                >
                  <span className="font-semibold text-[var(--color-coklat)]">
                    Gg. Karya, Rengas Pulau, Kec. Medan Marelan
                  </span>
                  <small className="text-[var(--color-coklat-muda)] text-xs">
                    Lokasi Kami
                  </small>
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[var(--color-krem)] rounded-xl flex items-center justify-center text-xl text-[var(--color-coklat-muda)] group-hover:bg-[var(--color-kuning)] group-hover:text-[var(--color-coklat)] transition-colors shrink-0">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[var(--color-coklat)]">
                    Senin – Sabtu
                  </span>
                  <small className="text-[var(--color-coklat-muda)] text-xs">
                    08.00 – 20.00 WIB
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[var(--color-putih)] p-8 rounded-2xl border-2 border-[var(--color-krem-dark)]">
            <h3 className="text-2xl font-bold text-[var(--color-coklat)] mb-8 flex items-center gap-2">
              <i className="fa-regular fa-paper-plane text-[var(--color-kuning-deep)]"></i>
              Kirim Pesan 💬
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendWA();
              }}
              className="space-y-5"
            >
              {/* Nama */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[var(--color-coklat)] mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 bg-[var(--color-krem)] border-2 border-transparent rounded-xl text-[var(--color-coklat)] placeholder-[var(--color-coklat-muda)]/60 focus:outline-none focus:border-[var(--color-kuning)] transition-colors"
                />
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label
                  htmlFor="wa"
                  className="block text-sm font-semibold text-[var(--color-coklat)] mb-2"
                >
                  Nomor WhatsApp
                </label>
                <input
                  type="text"
                  id="wa"
                  value={formData.wa}
                  onChange={handleChange}
                  placeholder="08xx-xxxx-xxxx"
                  className="w-full px-4 py-3 bg-[var(--color-krem)] border-2 border-transparent rounded-xl text-[var(--color-coklat)] placeholder-[var(--color-coklat-muda)]/60 focus:outline-none focus:border-[var(--color-kuning)] transition-colors"
                />
              </div>

              {/* Produk */}
              <div>
                <label
                  htmlFor="product"
                  className="block text-sm font-semibold text-[var(--color-coklat)] mb-2"
                >
                  Produk Yang Diminati
                </label>
                <select
                  id="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--color-krem)] border-2 border-transparent rounded-xl text-[var(--color-coklat)] focus:outline-none focus:border-[var(--color-kuning)] transition-colors cursor-pointer"
                >
                  <option value="">-- Pilih Produk --</option>
                  <option value="Induk Kunyit Jahe Merah">
                    Induk Kunyit Jahe Merah
                  </option>
                  <option value="Kunyit Asam">Kunyit Asam</option>
                  <option value="Manjakani">Manjakani</option>
                  <option value="Beras Kencur">Beras Kencur</option>
                  <option value="Pati Kunyit">Pati Kunyit</option>
                  <option value="Kunir Singset">Kunir Singset</option>
                  <option value="Temulawak">Temulawak</option>
                  <option value="Jamu Bersalin">Jamu Bersalin</option>
                  <option value="Jamu Rimpang">Jamu Rimpang</option>
                  <option value="Jamu Celup">Jamu Celup</option>
                  <option value="Bawang Putih Tunggal">
                    Bawang Putih Tunggal
                  </option>
                </select>
              </div>

              {/* Pesan */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-[var(--color-coklat)] mb-2"
                >
                  Pesan / Pertanyaan
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tulis pesan atau pertanyaan Anda..."
                  rows="4"
                  className="w-full px-4 py-3 bg-[var(--color-krem)] border-2 border-transparent rounded-xl text-[var(--color-coklat)] placeholder-[var(--color-coklat-muda)]/60 focus:outline-none focus:border-[var(--color-kuning)] transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[var(--color-kuning)] text-[var(--color-coklat)] px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:bg-[var(--color-kuning-deep)] hover:-translate-y-1 shadow-[0_8px_28px_rgba(245,197,24,0.3)] flex items-center justify-center gap-2"
              >
                <i className="fa-brands fa-whatsapp"></i>
                Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
