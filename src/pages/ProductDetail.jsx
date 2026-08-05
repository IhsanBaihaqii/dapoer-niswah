import { useParams, Navigate, Link } from "react-router-dom";
import { products } from "../data/products";
import { useState } from "react";
import OrderModal from "../components/OrderModal";

export default function ProductDetail({ focus }) {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-krem)] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <a
          href="/#produk"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-coklat-muda)] hover:text-[var(--color-orange)] transition-colors mb-10"
        >
          <i className="fa-solid fa-arrow-left"></i> Kembali ke Produk
        </a>

        <div className="bg-[var(--color-putih)] rounded-3xl border-4 border-[var(--color-kuning)] overflow-hidden shadow-xl flex flex-col md:flex-row">
          <div
            className={`md:w-2/5 p-10 flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-[var(--color-kuning)] ${product.bgColor}/20`}
          >
            <img
              src={product.img}
              alt={product.nama}
              className="w-full max-w-[250px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="md:w-3/5 p-10">
            {product.badge && (
              <span className="inline-block bg-[var(--color-orange)] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                {product.badge}
              </span>
            )}

            <h1 className="font-serif text-3xl md:text-4xl font-black text-[var(--color-coklat)] mb-4 leading-tight">
              {product.nama}
            </h1>

            <div className="text-[var(--color-orange)] font-black text-2xl mb-8">
              Mulai Rp {product.ukuran[0].harga.toLocaleString("id-ID")}
            </div>

            <div className="space-y-6 mb-8">
              {(!focus || focus === "manfaat") && (
                <div
                  className={`p-5 rounded-xl ${focus === "manfaat" ? "bg-[var(--color-kuning)]/10 border-2 border-[var(--color-kuning)]" : "bg-[var(--color-krem-dark)]/50"}`}
                >
                  <h3 className="text-xs font-bold text-[var(--color-coklat-muda)] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-heart-pulse"></i> Khasiat &
                    Manfaat
                  </h3>
                  <p className="text-[var(--color-coklat-mid)] text-sm leading-relaxed">
                    {product.manfaat}
                  </p>
                </div>
              )}

              {(!focus || focus === "komposisi") && (
                <div
                  className={`p-5 rounded-xl ${focus === "komposisi" ? "bg-[var(--color-kuning)]/10 border-2 border-[var(--color-kuning)]" : "bg-[var(--color-krem-dark)]/50"}`}
                >
                  <h3 className="text-xs font-bold text-[var(--color-coklat-muda)] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-leaf"></i> Komposisi Alami
                  </h3>
                  <p className="text-[var(--color-coklat-mid)] text-sm leading-relaxed">
                    {product.komposisi}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-bold text-[var(--color-coklat-muda)] uppercase tracking-widest mb-3">
                Pilihan Ukuran Tersedia
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.ukuran.map((u, i) => (
                  <div
                    key={i}
                    className={`px-5 py-2.5 rounded-lg border-2 text-sm font-bold transition-all bg-[var(--color-krem)] border-[var(--color-krem-dark)] text-[var(--color-coklat-mid)]`}
                  >
                    <span className="block">{u.size}</span>
                    <span className="text-[10px] opacity-80 block mt-0.5">
                      Rp {u.harga.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t-2 border-[var(--color-krem-dark)]">
              <h3 className="text-xs font-bold text-[var(--color-coklat-muda)] uppercase tracking-widest mb-4">
                Pesan Melalui
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/6285370473784?text=Halo Dapoer Niswah, saya ingin pesan ${product.nama}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5c] text-white px-5 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-1 shadow-sm"
                >
                  <i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp
                </a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-[var(--color-kuning)] hover:bg-[var(--color-kuning-deep)] text-[var(--color-coklat)] px-5 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-1 shadow-sm"
                >
                  <i className="fa-solid fa-basket-shopping text-lg"></i> +
                  Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
