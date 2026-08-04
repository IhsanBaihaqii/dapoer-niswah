import { useCart } from '../context/CartContext';

export default function CartPanel() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutWA = () => {
    if (cart.length === 0) return;
    
    let text = "Halo Dapoer Niswah, saya ingin memesan:\n\n";
    cart.forEach(item => {
      text += `• ${item.product.nama} (${item.size.size}) x${item.quantity} = Rp ${(item.size.harga * item.quantity).toLocaleString('id-ID')}\n`;
    });
    
    text += `\nTotal: Rp ${cartTotal.toLocaleString('id-ID')}\n\nMohon info ketersediaan dan pengiriman. Terima kasih!`;
    
    window.open(`https://wa.me/6285370473784?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-[var(--color-putih)] h-full shadow-2xl flex flex-col animate-[slideInRight_0.3s_ease-out]">
        
        <div className="flex items-center justify-between p-6 border-b-2 border-[var(--color-krem-dark)] bg-[var(--color-coklat)] text-[var(--color-kuning)]">
          <h2 className="font-serif font-black text-xl flex items-center gap-3">
            <i className="fa-solid fa-basket-shopping"></i> Keranjang
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-kuning)]/20 transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <i className="fa-solid fa-basket-shopping text-6xl text-[var(--color-coklat-muda)] mb-4"></i>
              <p className="font-bold text-[var(--color-coklat)] text-lg mb-1">Keranjang masih kosong</p>
              <p className="text-sm text-[var(--color-coklat-mid)]">Tambahkan produk untuk mulai belanja</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size.size}`} className="flex gap-4 p-4 bg-[var(--color-krem)] rounded-2xl border border-[var(--color-krem-dark)] relative group">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${item.product.bgColor}/20 p-2 shrink-0`}>
                    <img src={item.product.img} alt={item.product.nama} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[var(--color-coklat)] line-clamp-1 mb-1 pr-6">{item.product.nama}</h3>
                    <div className="text-xs font-bold text-[var(--color-coklat-muda)] bg-[var(--color-kuning-pale)] inline-block px-2 py-0.5 rounded mb-2">
                      {item.size.size}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="font-black text-[var(--color-orange)] text-sm">
                        Rp {(item.size.harga * item.quantity).toLocaleString('id-ID')}
                      </div>
                      
                      <div className="flex items-center gap-2 bg-[var(--color-putih)] border border-[var(--color-krem-dark)] rounded-md p-1">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size.size, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-krem-dark)] text-[var(--color-coklat)] transition-colors"
                        >
                          <i className="fa-solid fa-minus text-xs"></i>
                        </button>
                        <span className="w-4 text-center font-bold text-xs text-[var(--color-coklat)]">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size.size, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--color-kuning)] text-[var(--color-coklat)] transition-colors"
                        >
                          <i className="fa-solid fa-plus text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product.id, item.size.size)}
                    className="absolute top-3 right-3 text-[var(--color-coklat-muda)] hover:text-red-500 transition-colors"
                    title="Hapus item"
                  >
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t-4 border-[var(--color-kuning)] bg-[var(--color-putih)]">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[var(--color-coklat-mid)]">Total Pesanan</span>
              <span className="text-2xl font-black text-[var(--color-orange)]">Rp {cartTotal.toLocaleString('id-ID')}</span>
            </div>
            
            <button 
              onClick={handleCheckoutWA}
              className="w-full bg-[#25d366] text-white font-bold py-3.5 rounded-xl hover:bg-[#1ebe5c] transition-colors flex items-center justify-center gap-2 mb-3 shadow-md"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i> Pesan via WhatsApp
            </button>
            
            <button 
              onClick={clearCart}
              className="w-full bg-transparent border-2 border-[var(--color-krem-dark)] text-[var(--color-coklat-muda)] font-bold py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-trash-can"></i> Hapus Semua
            </button>
          </div>
        )}
        
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
