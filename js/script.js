// ── CART STATE ──
let cart = [];

function cartKey(prodId, size) {
  return `${prodId}::${size}`;
}

function addToCart(prodId, sizeName, sizeHarga, sizeHargaNum) {
  const key = cartKey(prodId, sizeName);
  const existing = cart.find((i) => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    const p = produk[prodId];
    cart.push({
      key,
      prodId,
      nama: p.nama,
      bgColor: p.bgColor,
      size: sizeName,
      harga: sizeHarga,
      hargaNum: sizeHargaNum || 0,
      qty: 1,
    });
  }
  updateCartUI();
  showCartToast();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = total;
  const itemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-basket-shopping"></i><p>Keranjang masih kosong</p><p style="font-size:0.8rem;opacity:0.6;">Tambahkan produk untuk mulai belanja</p></div>`;
    document.getElementById("cartTotal").textContent = "Rp 0";
    return;
  }
  let html = "";
  let totalHarga = 0;
  cart.forEach((item, idx) => {
    totalHarga += item.hargaNum * item.qty;
    html += `<div class="cart-item">
      <div class="cart-item-img" style="background:${item.bgColor}20;border-color:${item.bgColor}40;">
        <img src="${produk[item.prodId].img}" style="width:40px;height:40px;object-fit:contain;">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nama}</div>
        <div class="cart-item-size">${item.size} — ${item.harga || "Hubungi"}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeCartQty(${idx},-1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty(${idx},1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
        <div class="cart-item-price">${item.hargaNum > 0 ? "Rp " + formatNum(item.hargaNum * item.qty) : "—"}</div>
        <button class="cart-item-del" onclick="removeCartItem(${idx})"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>`;
  });
  itemsEl.innerHTML = html;
  document.getElementById("cartTotal").textContent =
    totalHarga > 0 ? "Rp " + formatNum(totalHarga) : "—";
}

function changeCartQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}

function removeCartItem(idx) {
  cart.splice(idx, 1);
  updateCartUI();
}

function clearCart() {
  if (confirm("Hapus semua produk dari keranjang?")) {
    cart = [];
    updateCartUI();
  }
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("open");
  document.getElementById("cartPanel").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.getElementById("cartPanel").classList.remove("open");
  document.body.style.overflow = "";
}

function checkoutWA() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }
  let txt = "Halo Dapoer Niswah 🌿\n\nSaya ingin memesan:\n";
  cart.forEach((i) => {
    txt += `• ${i.nama} (${i.size}) x${i.qty} = ${i.hargaNum > 0 ? "Rp " + formatNum(i.hargaNum * i.qty) : "Hubungi"}\n`;
  });
  const total = cart.reduce((s, i) => s + i.hargaNum * i.qty, 0);
  if (total > 0) txt += `\nTotal: Rp ${formatNum(total)}`;
  txt += "\n\nMohon konfirmasi ketersediaan & pengiriman. Terima kasih!";
  window.open(
    "https://wa.me/6285312345678?text=" + encodeURIComponent(txt),
    "_blank",
  );
}

function showCartToast() {
  let t = document.getElementById("cartToast");
  if (!t) {
    t = document.createElement("div");
    t.id = "cartToast";
    t.style.cssText =
      "position:fixed;bottom:80px;right:24px;background:var(--kuning);color:var(--coklat);padding:10px 18px;border-radius:4px;font-size:0.82rem;font-weight:700;z-index:9995;animation:fadeUp 0.3s ease;";
    document.body.appendChild(t);
  }
  t.textContent = "✓ Ditambahkan ke keranjang";
  t.style.display = "block";
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.display = "none";
  }, 2000);
}

// FIX: kirim hargaNum (number), bukan string harga
function quickAddCart(index, e) {
  e.stopPropagation();
  const p = produk[index];
  addToCart(index, p.ukuran, p.harga, p.hargaNum);
}

function filterProd(kat, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderProduk(
    kat === "semua" ? produk : produk.filter((p) => p.kategori === kat),
  );
}

renderProduk(produk);

// ── MODAL ──
let currentProd = null;
let currentProdIdx = null; // FIX: simpan index produk yang sedang dibuka
let modalQty = 1;

function updateModalTotal() {
  if (!currentProd) return;
  const total = currentProd.hargaNum * modalQty;
  document.getElementById("modalQtyVal").textContent = modalQty;
  document.getElementById("modalQtyTotal").textContent =
    total > 0 ? "Rp " + formatNum(total) : "—";
}

function openDetail(i) {
  currentProd = produk[i];
  currentProdIdx = i;
  modalQty = 1;

  document.getElementById("mImg").style.background = currentProd.bgColor + "33";
  document.getElementById("mImg").innerHTML =
    `<img src="${currentProd.img}" style="max-height:180px;object-fit:contain">`;
  document.getElementById("mName").textContent = currentProd.nama;
  document.getElementById("mManfaat").textContent = currentProd.manfaat;

  updateModalTotal();

  document.getElementById("modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function changeModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  updateModalTotal();
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
  document.body.style.overflow = "";
}
function closeModalOutside(e) {
  if (e.target === document.getElementById("modal")) closeModal();
}

// FIX: orderWA modal pakai currentProd langsung (bukan sz.size / sz.harga)
function orderWA() {
  if (!currentProd) return;
  let txt = `Halo Dapoer Niswah 🌿\n\nSaya ingin memesan:\n• ${currentProd.nama} (${currentProd.ukuran}) x${modalQty}`;
  if (currentProd.harga) txt += ` — ${currentProd.harga}`;
  txt += "\n\nMohon info ketersediaan dan pengiriman. Terima kasih!";
  window.open(
    "https://wa.me/6285312345678?text=" + encodeURIComponent(txt),
    "_blank",
  );
}

function orderGofood() {
  window.open("https://gofood.co.id/", "_blank");
}

function orderShopee() {
  window.open("https://shopee.co.id/", "_blank");
}

// FIX: pakai currentProdIdx bukan currentProd.id yang tidak ada
function addFromModal() {
  if (!currentProd || currentProdIdx === null) return;
  for (let i = 0; i < modalQty; i++) {
    addToCart(
      currentProdIdx,
      currentProd.ukuran,
      currentProd.harga,
      currentProd.hargaNum,
    );
  }
  closeModal();
  openCart();
}

// ── NAVBAR & SCROLL ──
window.addEventListener("scroll", () => {
  document.getElementById("btt").classList.toggle("show", window.scrollY > 400);
});

function toggleNav() {
  document.getElementById("navLinks").classList.toggle("open");
}
function closeNav() {
  document.getElementById("navLinks").classList.remove("open");
}

// ── WA FORM ──
function sendWA() {
  const nama = document.getElementById("fname").value.trim();
  const wa = document.getElementById("fwa").value.trim();
  const prod = document.getElementById("fprod").value;
  const msg = document.getElementById("fmsg").value.trim();
  if (!nama) {
    alert("Mohon isi nama Anda.");
    return;
  }
  const text = `Halo Dapoer Niswah 🌿\n\nNama: ${nama}\nWA: ${wa}\nProduk: ${prod || "-"}\nPesan: ${msg || "-"}`;
  window.open(
    "https://wa.me/6285312345678?text=" + encodeURIComponent(text),
    "_blank",
  );
}
