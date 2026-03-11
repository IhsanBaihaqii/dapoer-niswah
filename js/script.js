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
      emoji: p.emoji,
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

function formatNum(n) {
  return n.toLocaleString("id-ID");
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

function quickAddCart(index, e) {
  e.stopPropagation();

  const p = produk[index];

  addToCart(index, p.ukuran, "Rp " + formatNum(p.harga), p.harga);
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
let modalQty = 1;
let selectedSizeIdx = 0;

function openModal(p) {
  currentProd = p;
  modalQty = 1;
  selectedSizeIdx = p.ukuran.findIndex((u) => u.harga) || 0;
  if (selectedSizeIdx < 0) selectedSizeIdx = 0;

  document.getElementById("mImg").style.background = p.bgColor + "33";
  document.getElementById("mImg").innerHTML =
    `<span style="font-size:5rem;">${p.emoji}</span>`;
  document.getElementById("mName").textContent = p.nama;
  document.getElementById("mManfaat").textContent = p.manfaat;
  document.getElementById("modalQtyVal").textContent = 1;

  const szEl = document.getElementById("mSizes");
  szEl.innerHTML = p.ukuran
    .map(
      (u, i) => `
    <div class="modal-size ${i === selectedSizeIdx ? "selected" : ""}" onclick="selectSize(${i})">
      <strong>${u.size}</strong>
      <span>${u.harga || "Hubungi"}</span>
    </div>`,
    )
    .join("");

  document.getElementById("modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function selectSize(idx) {
  selectedSizeIdx = idx;
  document.querySelectorAll(".modal-size").forEach((el, i) => {
    el.classList.toggle("selected", i === idx);
  });
}

function changeModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById("modalQtyVal").textContent = modalQty;
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
  document.body.style.overflow = "";
}
function closeModalOutside(e) {
  if (e.target === document.getElementById("modal")) closeModal();
}

function getSelectedSize() {
  if (!currentProd) return null;
  return currentProd.ukuran[selectedSizeIdx] || currentProd.ukuran[0];
}

function orderWA() {
  if (!currentProd) return;
  const sz = getSelectedSize();
  let txt = `Halo Dapoer Niswah 🌿\n\nSaya ingin memesan:\n• ${currentProd.nama} (${sz.size}) x${modalQty}`;
  if (sz.harga) txt += ` — ${sz.harga}`;
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

function addFromModal() {
  if (!currentProd) return;
  const sz = getSelectedSize();
  for (let i = 0; i < modalQty; i++) {
    addToCart(currentProd.id, sz.size, sz.harga, sz.hargaNum || 0);
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
