import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { products } from "../data/products";
import OrderModal from "../components/OrderModal";

export default function ProductDetail({ focus }) {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redirect jika produk tidak ditemukan
  if (!product) {
    return <Navigate to="/" replace />;
  }

  // Metadata dinamis
  const pageTitle = {
    manfaat: `Manfaat ${product.nama} | Dapoer Niswah`,
    komposisi: `Komposisi ${product.nama} | Dapoer Niswah`,
    default: `${product.nama} | Dapoer Niswah`,
  };

  const metaDescription =
    focus === "komposisi" ? product.komposisi : product.manfaat;
  const ogImage = `https://dapoerniswah.vercel.app/assets/img/produk/${product.slug}.png`;
  const canonicalUrl = `https://dapoerniswah.vercel.app/produk/${product.slug}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle[focus] || pageTitle.default}</title>
        <meta name="description" content={metaDescription} />
        <meta
          property="og:title"
          content={pageTitle[focus] || pageTitle.default}
        />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="min-h-screen bg-[var(--color-krem)] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigasi */}
          <nav className="sticky top-20 z-40 flex items-center gap-2 text-sm mb-8 bg-[var(--color-putih)] p-3 rounded-xl shadow-sm border border-[var(--color-krem-dark)]">
            <Link
              to="/"
              className="text-[var(--color-coklat-muda)] hover:text-[var(--color-orange)] transition-colors font-medium"
            >
              <i className="fa-solid fa-house mr-1" aria-hidden="true" />{" "}
              Beranda
            </Link>
            <i
              className="fa-solid fa-chevron-right text-[var(--color-coklat-muda)] text-xs"
              aria-hidden="true"
            />
            <Link
              to="/#produk"
              className="text-[var(--color-coklat-muda)] hover:text-[var(--color-orange)] transition-colors font-medium"
            >
              Produk
            </Link>
            <i
              className="fa-solid fa-chevron-right text-[var(--color-coklat-muda)] text-xs"
              aria-hidden="true"
            />
            <span className="text-[var(--color-coklat)] font-bold truncate max-w-[150px]">
              {product.nama}
            </span>
          </nav>

          {/* Kartu Produk */}
          <article className="bg-[var(--color-putih)] rounded-3xl border-4 border-[var(--color-kuning)] overflow-hidden shadow-xl flex flex-col md:flex-row">
            {/* Gambar Produk */}
            <figure
              className={`md:w-2/5 p-10 flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-[var(--color-kuning)] ${product.bgColor}/20`}
            >
              <img
                src={product.img}
                alt={product.nama}
                className="w-full max-w-[250px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </figure>

            {/* Detail Produk */}
            <section className="md:w-3/5 p-10">
              {product.badge && (
                <span className="inline-block bg-[var(--color-orange)] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  {product.badge}
                </span>
              )}

              <h1 className="font-serif text-3xl md:text-4xl font-black text-[var(--color-coklat)] mb-4 leading-tight">
                {product.nama}
              </h1>

              <p className="text-[var(--color-orange)] font-black text-2xl mb-8">
                Mulai Rp {product.ukuran[0].harga.toLocaleString("id-ID")}
              </p>

              {/* Manfaat & Komposisi */}
              <div className="space-y-6 mb-8">
                {(!focus || focus === "manfaat") && (
                  <div
                    className={`p-5 rounded-xl ${
                      focus === "manfaat"
                        ? "bg-[var(--color-kuning)]/10 border-2 border-[var(--color-kuning)]"
                        : "bg-[var(--color-krem-dark)]/50"
                    }`}
                  >
                    <h3 className="text-xs font-bold text-[var(--color-coklat-muda)] uppercase tracking-widest mb-2 flex items-center gap-2">
                      <i
                        className="fa-solid fa-heart-pulse"
                        aria-hidden="true"
                      />{" "}
                      Khasiat & Manfaat
                    </h3>
                    <p className="text-[var(--color-coklat-mid)] text-sm leading-relaxed">
                      {product.manfaat}
                    </p>
                  </div>
                )}

                {(!focus || focus === "komposisi") && (
                  <div
                    className={`p-5 rounded-xl ${
                      focus === "komposisi"
                        ? "bg-[var(--color-kuning)]/10 border-2 border-[var(--color-kuning)]"
                        : "bg-[var(--color-krem-dark)]/50"
                    }`}
                  >
                    <h3 className="text-xs font-bold text-[var(--color-coklat-muda)] uppercase tracking-widest mb-2 flex items-center gap-2">
                      <i className="fa-solid fa-leaf" aria-hidden="true" />{" "}
                      Komposisi Alami
                    </h3>
                    <p className="text-[var(--color-coklat-mid)] text-sm leading-relaxed">
                      {product.komposisi}
                    </p>
                  </div>
                )}
              </div>

              {/* Pilihan Ukuran */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-[var(--color-coklat-muda)] uppercase tracking-widest mb-3">
                  Pilihan Ukuran Tersedia
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.ukuran.map((ukuran, index) => (
                    <div
                      key={index}
                      className="px-5 py-2.5 rounded-lg border-2 text-sm font-bold transition-all bg-[var(--color-krem)] border-[var(--color-krem-dark)] text-[var(--color-coklat-mid)]"
                    >
                      <span className="block">{ukuran.size}</span>
                      <span className="text-[10px] opacity-80 block mt-0.5">
                        Rp {ukuran.harga.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tombol Aksi */}
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
                    <i
                      className="fa-brands fa-whatsapp text-lg"
                      aria-hidden="true"
                    />{" "}
                    WhatsApp
                  </a>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-[var(--color-kuning)] hover:bg-[var(--color-kuning-deep)] text-[var(--color-coklat)] px-5 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-1 shadow-sm"
                  >
                    <i
                      className="fa-solid fa-basket-shopping text-lg"
                      aria-hidden="true"
                    />{" "}
                    + Keranjang
                  </button>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* Modal Keranjang */}
        <OrderModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </>
  );
}
