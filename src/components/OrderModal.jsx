import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function OrderModal({ product, isOpen, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (isOpen && product) {
      const initial = {};
      product.ukuran.forEach(u => {
        initial[u.size] = 0;
      });
      setQuantities(initial);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleIncrement = (size) => {
    setQuantities(prev => ({ ...prev, [size]: prev[size] + 1 }));
  };

  const handleDecrement = (size) => {
    setQuantities(prev => ({ ...prev, [size]: Math.max(0, prev[size] - 1) }));
  };

  const handleSave = () => {
    let added = false;
    product.ukuran.forEach(u => {
      const qty = quantities[u.size];
      if (qty > 0) {
        addToCart(product, u, qty);
        added = true;
      }
    });

    if (added) {
      onClose();
      setIsCartOpen(true);
    } else {
      onClose();
    }
  };

  const totalItemCount = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = product.ukuran.reduce((total, u) => total + (u.harga * quantities[u.size]), 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[var(--color-putih)] rounded-3xl w-full max-w-md overflow-hidden border-4 border-[var(--color-kuning)] shadow-2xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        
        <div className="flex justify-between items-center p-5 border-b-2 border-[var(--color-krem-dark)]">
          <h2 className="font-serif font-black text-xl text-[var(--color-coklat)]">Pilih Ukuran</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-krem-dark)] text-[var(--color-coklat-mid)] transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="overflow-y-auto p-5 flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${product.bgColor}/20 p-2 shrink-0`}>
              <img src={product.img} alt={product.nama} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[var(--color-coklat)] leading-tight">{product.nama}</h3>
              {product.badge && (
                <span className="inline-block mt-1 bg-[var(--color-orange)] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {product.ukuran.map(u => (
              <div key={u.size} className="flex items-center justify-between p-4 bg-[var(--color-krem)] rounded-xl border border-[var(--color-krem-dark)]">
                <div>
                  <div className="font-bold text-[var(--color-coklat)]">{u.size}</div>
                  <div className="text-sm font-bold text-[var(--color-orange)]">Rp {u.harga.toLocaleString('id-ID')}</div>
                </div>
                <div className="flex items-center gap-3 bg-[var(--color-putih)] border border-[var(--color-krem-dark)] rounded-lg p-1">
                  <button 
                    onClick={() => handleDecrement(u.size)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--color-krem-dark)] text-[var(--color-coklat)] transition-colors disabled:opacity-50"
                    disabled={quantities[u.size] === 0}
                  >
                    <i className="fa-solid fa-minus text-xs"></i>
                  </button>
                  <span className="w-6 text-center font-bold text-[var(--color-coklat)]">{quantities[u.size]}</span>
                  <button 
                    onClick={() => handleIncrement(u.size)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--color-kuning)] text-[var(--color-coklat)] transition-colors"
                  >
                    <i className="fa-solid fa-plus text-xs"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 border-t-2 border-[var(--color-krem-dark)] bg-[var(--color-putih)]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-[var(--color-coklat-mid)]">Total Pesanan:</span>
            <span className="text-xl font-black text-[var(--color-orange)]">Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
          <button 
            onClick={handleSave}
            disabled={totalItemCount === 0}
            className="w-full bg-[var(--color-kuning)] text-[var(--color-coklat)] font-bold py-3.5 rounded-xl hover:bg-[var(--color-kuning-deep)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-basket-shopping"></i> Simpan ke Keranjang
          </button>
        </div>
        
      </div>
    </div>
  );
}
