import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import OrderModal from "./OrderModal";

export default function ProductSection() {
  const [category, setCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [orderProduct, setOrderProduct] = useState(null);
  const itemsPerPage = 3;

  const filteredProducts = products.filter(
    (p) => category === "Semua" || p.kategori === category,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const categories = ["Semua", "Jamu", "Frozen Food"];

  return (
    <section id="produk" className="py-24 px-6 max-w-6xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-[var(--color-orange)] bg-[var(--color-orange)]/10 border border-[var(--color-orange)]/20 px-4 py-1.5 rounded mb-4">
            <i className="fa-solid fa-boxes-stacked"></i> Koleksi Jamu & Cemilan
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-coklat)] leading-tight">
            Produk{" "}
            <em className="italic text-[var(--color-coklat-muda)]">Pilihan</em>{" "}
            <span className="text-[var(--color-kuning-deep)]">Terbaik</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${category === cat ? "bg-[var(--color-kuning)] text-[var(--color-coklat)] shadow-md" : "bg-[var(--color-krem-dark)] text-[var(--color-coklat-mid)] hover:bg-[var(--color-kuning-pale)]"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[var(--color-putih)] rounded-2xl overflow-hidden border-2 border-transparent hover:border-[var(--color-kuning)] shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
          >
            <div
              className={`h-48 relative flex items-center justify-center p-6 ${product.bgColor}/20`}
            >
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[var(--color-orange)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-10">
                  {product.badge}
                </div>
              )}
              <img
                src={product.img}
                alt={product.nama}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-[var(--color-coklat)] mb-2 line-clamp-2">
                {product.nama}
              </h3>
              <p className="text-sm text-[var(--color-coklat-mid)] line-clamp-2 mb-4 flex-1">
                {product.manfaat}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.ukuran.map((u) => (
                  <span
                    key={u.size}
                    className="text-[10px] font-bold bg-[var(--color-krem)] text-[var(--color-coklat-muda)] px-2.5 py-1 rounded-md border border-[var(--color-krem-dark)]"
                  >
                    {u.size}
                  </span>
                ))}
              </div>

              <div className="font-black text-[var(--color-orange)] text-lg mb-4">
                Mulai Rp {product.ukuran[0].harga.toLocaleString("id-ID")}
              </div>

              <div className="flex gap-2 mt-auto">
                <Link
                  to={`/produk/${product.slug}`}
                  className="flex-1 bg-transparent border-2 border-[var(--color-kuning)] text-[var(--color-coklat)] font-bold text-sm text-center py-2.5 rounded-lg hover:bg-[var(--color-kuning)] transition-colors"
                >
                  <i className="fa-solid fa-eye mr-2"></i> Lihat
                </Link>
                <button
                  onClick={() => setOrderProduct(product)}
                  className="flex-1 bg-[var(--color-kuning)] text-[var(--color-coklat)] font-bold text-sm text-center py-2.5 rounded-lg hover:bg-[var(--color-kuning-deep)] transition-colors"
                >
                  <i className="fa-solid fa-basket-shopping mr-2"></i> Pesan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-putih)] border-2 border-[var(--color-krem-dark)] text-[var(--color-coklat-mid)] hover:border-[var(--color-kuning)] hover:text-[var(--color-coklat)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="font-bold text-[var(--color-coklat-mid)] text-sm">
            Halaman {currentPage} dari {totalPages}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-putih)] border-2 border-[var(--color-krem-dark)] text-[var(--color-coklat-mid)] hover:border-[var(--color-kuning)] hover:text-[var(--color-coklat)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}

      {/* Order Modal */}
      <OrderModal
        product={orderProduct}
        isOpen={!!orderProduct}
        onClose={() => setOrderProduct(null)}
      />
    </section>
  );
}
