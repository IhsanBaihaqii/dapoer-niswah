import { useState, useRef, useEffect } from "react";
import { products } from "../data/products";
import OrderModal from "../components/OrderModal";
import { Helmet } from "react-helmet-async";

// Komponen untuk Pesan
const ChatMessage = ({ message, setOrderProduct }) => {
  const isUser = message.sender === "user";
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Reset index ketika produk berubah
  useEffect(() => {
    setCurrentIndex(0);
  }, [message.products]);

  const scrollToProduct = (index) => {
    const container = carouselRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".product-card");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleNext = () => {
    if (!message.products) return;
    const maxIndex = message.products.length - 1;
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    scrollToProduct(newIndex);
  };

  const handlePrev = () => {
    if (!message.products) return;
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToProduct(newIndex);
  };

  // Handle scroll manual untuk update indicator
  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container || !message.products) return;

    const cards = container.querySelectorAll(".product-card");
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const distance = Math.abs(rect.left - containerRect.left);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndex(closestIndex);
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-sm ${
          isUser
            ? "bg-[var(--color-kuning)] text-[var(--color-coklat)] rounded-br-none"
            : "bg-white border-2 border-[var(--color-krem-dark)] text-[var(--color-coklat)] rounded-bl-none"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.text}
        </p>

        {/* Produk Carousel */}
        {message.products && message.products.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[var(--color-coklat-muda)] uppercase tracking-wider">
                🛍️ Pilih Produk:
              </p>
              <span className="text-[10px] text-[var(--color-coklat-mid)] bg-[var(--color-krem)] px-2 py-0.5 rounded-full">
                {currentIndex + 1} / {message.products.length}
              </span>
            </div>

            {/* Carousel Container dengan Tombol */}
            <div className="relative">
              {/* Tombol Previous */}
              {message.products.length > 1 && currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[var(--color-coklat)] w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 -ml-3 border-2 border-[var(--color-krem-dark)]"
                  aria-label="Produk sebelumnya"
                >
                  <i className="fa-solid fa-chevron-left text-sm"></i>
                </button>
              )}

              {/* Carousel Items */}
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar scroll-smooth"
              >
                {message.products.map((product, index) => (
                  <div
                    key={product.id}
                    className="product-card min-w-[180px] w-[180px] bg-white border-2 border-[var(--color-krem-dark)] rounded-xl overflow-hidden shadow-sm shrink-0 snap-start flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                    data-index={index}
                  >
                    <div
                      className={`w-full h-28 flex items-center justify-center p-2 ${product.bgColor}/20 group-hover:${product.bgColor}/30 transition-colors relative`}
                    >
                      <img
                        src={product.img}
                        alt={product.nama}
                        className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      {product.badge && (
                        <span className="absolute top-1 right-1 bg-[var(--color-orange)] text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h4 className="font-bold text-sm text-[var(--color-coklat)] line-clamp-1">
                        {product.nama}
                      </h4>
                      <p className="text-[10px] text-[var(--color-coklat-mid)] line-clamp-2 mt-1 min-h-[30px]">
                        {product.manfaat}
                      </p>
                      <div className="text-[var(--color-orange)] font-bold text-sm mt-2 mb-3">
                        Mulai Rp{" "}
                        {product.ukuran[0].harga.toLocaleString("id-ID")}
                      </div>
                      <button
                        onClick={() => setOrderProduct(product)}
                        className="mt-auto w-full bg-[var(--color-kuning)] hover:bg-[var(--color-orange)] hover:text-white text-[var(--color-coklat)] font-bold text-xs py-2.5 rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2"
                      >
                        <i className="fa-solid fa-basket-shopping"></i>
                        <span>Pesan</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tombol Next */}
              {message.products.length > 1 &&
                currentIndex < message.products.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[var(--color-coklat)] w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 -mr-3 border-2 border-[var(--color-krem-dark)]"
                    aria-label="Produk berikutnya"
                  >
                    <i className="fa-solid fa-chevron-right text-sm"></i>
                  </button>
                )}
            </div>

            {/* Dot Indicators */}
            {message.products.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {message.products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      scrollToProduct(index);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-6 bg-[var(--color-orange)]"
                        : "w-1.5 bg-[var(--color-krem-dark)] hover:bg-[var(--color-coklat-muda)]"
                    }`}
                    aria-label={`Ke produk ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Komponen untuk Kartu Produk (tidak digunakan langsung, sudah di dalam ChatMessage)
// ... (ProductCard sudah diintegrasikan ke dalam ChatMessage)

// Komponen untuk Header Chat
const ChatHeader = ({ onClose }) => {
  return (
    <div className="bg-[var(--color-coklat)] p-4 flex items-center gap-4 text-[var(--color-kuning-pale)]">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shrink-0 shadow-md">
        <img
          src="/assets/img/logo.png"
          alt="Dapoer Niswah"
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-lg leading-tight">Dapoer Niswah</h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
          <span className="text-[var(--color-kuning)]">Online</span>
          <span className="text-white/50">•</span>
          <span className="text-white/70">Balas dalam 1 menit</span>
        </div>
      </div>

      {/* Tombol Kembali / Close */}
      <button
        onClick={onClose}
        className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all hover:scale-105"
        aria-label="Tutup chat"
      >
        <i className="fa-solid fa-xmark text-xl"></i>
      </button>
    </div>
  );
};

// Komponen untuk Input Area
const ChatInput = ({ input, setInput, handleSend, isTyping }) => {
  return (
    <div className="p-3 md:p-4 bg-white border-t-2 border-[var(--color-krem-dark)]">
      {/* Quick Reply Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => handleSend(null, "jamu")}
          className="text-xs bg-[var(--color-krem)] hover:bg-[var(--color-kuning)] text-[var(--color-coklat)] px-4 py-1.5 rounded-full border border-[var(--color-krem-dark)] transition-colors"
        >
          🌿 Jamu
        </button>
        <button
          type="button"
          onClick={() => handleSend(null, "frozen food")}
          className="text-xs bg-[var(--color-krem)] hover:bg-[var(--color-kuning)] text-[var(--color-coklat)] px-4 py-1.5 rounded-full border border-[var(--color-krem-dark)] transition-colors"
        >
          🥟 Frozen Food
        </button>
      </div>

      <form onSubmit={(e) => handleSend(e)} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan disini..."
          className="flex-1 bg-[var(--color-krem)] border-2 border-[var(--color-krem-dark)] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[var(--color-kuning)] focus:ring-4 focus:ring-[var(--color-kuning)]/30 transition-all text-[var(--color-coklat)] placeholder-[var(--color-coklat-mid)]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-12 h-12 bg-[var(--color-orange)] hover:bg-[var(--color-coklat)] text-white rounded-full flex items-center justify-center transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <i className="fa-solid fa-paper-plane text-sm"></i>
        </button>
      </form>
    </div>
  );
};

// Komponen Utama
export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: 'Halo kak! 👋 Selamat datang di layanan chat Dapoer Niswah.\n\nKetik "hai" untuk menyapa, atau ketik "jamu" / "frozen food" untuk melihat katalog produk kami.',
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [orderProduct, setOrderProduct] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto focus input
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const getBotResponse = (query) => {
    // Hello responses
    if (query.match(/^(hai|halo|hi|hey|p|assalamualaikum)$/i)) {
      return {
        text: 'Halo kak! 👋 Ada yang bisa kami bantu hari ini? Kakak bisa ketik "jamu" atau "frozen food" untuk melihat produk ya.',
        products: null,
      };
    }

    // Jamu products
    if (query.includes("jamu")) {
      const jamuProducts = products.filter((p) => p.kategori === "Jamu");
      return {
        text: "🌿 Berikut produk jamu kami yang terbuat dari rempah alami pilihan. Khasiatnya sudah terpercaya ya kak!",
        products: jamuProducts,
      };
    }

    // Frozen food products
    if (
      query.includes("frozen") ||
      query.includes("curry") ||
      query.includes("food")
    ) {
      const frozenProducts = products.filter(
        (p) => p.kategori === "Frozen Food",
      );
      return {
        text: "🥟 Ini dia produk frozen food kami. Praktis, tinggal panaskan, dan dijamin lezat!",
        products: frozenProducts,
      };
    }

    // Default response
    return {
      text: 'Maaf kak, saya belum mengerti 🙏. Kakak bisa coba ketik "jamu" atau "frozen food" untuk melihat katalog produk kami.',
      products: null,
    };
  };

  const handleSend = (e, quickReply = null) => {
    if (e) e.preventDefault();

    const messageText = quickReply || input.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Get bot response
    const response = getBotResponse(messageText.toLowerCase().trim());

    // Simulate typing delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.text,
        products: response.products,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleClose = () => {
    window.location.href = "/#produk";
  };

  return (
    <>
      <Helmet>
        <title>Chat Dapoer Niswah</title>
        <meta
          name="description"
          content="Layanan pelanggan dan pemesanan online Dapoer Niswah."
        />
      </Helmet>

      {/* Full screen di semua device */}
      <div className="h-screen w-screen bg-[var(--color-krem)] flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <ChatHeader onClose={handleClose} />
        </div>

        {/* Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[var(--color-krem)]/30 space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              setOrderProduct={setOrderProduct}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white border-2 border-[var(--color-krem-dark)] rounded-2xl rounded-bl-none px-5 py-3 shadow-sm flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 bg-[var(--color-coklat-mid)] rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-2.5 h-2.5 bg-[var(--color-coklat-mid)] rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-2.5 h-2.5 bg-[var(--color-coklat-mid)] rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Fixed Bottom */}
        <div className="flex-shrink-0">
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isTyping={isTyping}
            inputRef={inputRef}
          />
        </div>
      </div>

      {/* Order Modal */}
      {orderProduct && (
        <OrderModal
          product={orderProduct}
          isOpen={!!orderProduct}
          onClose={() => setOrderProduct(null)}
        />
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
