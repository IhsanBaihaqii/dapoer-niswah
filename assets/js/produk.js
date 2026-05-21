let produk = [];
async function loadProduk(ukuran) {
  try {
    const response = await fetch(`/assets/data/jamu/${ukuran}.json`);
    return await response.json();
  } catch (error) {
    console.error("Gagal load JSON:", error);
    return [];
  }
}

async function getAllProduk() {
  const results = await Promise.all([
    loadProduk("60ml"),
    loadProduk("250ml"),
    loadProduk("500ml"),
    loadProduk("1000ml"),
  ]);
  return results.flat();
}

// ── HELPER ──
function formatNum(n) {
  return Number(n).toLocaleString("id-ID");
}

// ── RENDER PRODUK ──
function renderProduk(data) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  // mengurutkan sesuai abjad nama
  // data.sort((a, b) => {
  //   return a.nama.localeCompare(b.nama);
  // });

  data.forEach((p, i) => {
    // Cari index asli di array produk (penting saat filter aktif)
    const realIndex = produk.indexOf(p);
    const card = document.createElement("div");
    card.className = "prod-card";

    card.innerHTML = `
      <div class="prod-img-wrap" style="background:${p.bgColor}22;">
        <img src="${p.img}" alt="${p.nama}" style="width:100%;height:100%;object-fit:contain;">
        ${p.badge ? `<div class="prod-badge">${p.badge}</div>` : ""}
      </div>
      <div class="prod-body">
        <h3>${p.nama}</h3>
        <p>${p.manfaat}</p>
        <div class="prod-sizes">
          <span class="size-chip">${p.ukuran}</span>
        </div>
        <div class="prod-price">${p.harga}</div>
        <div class="prod-actions">
          <button class="prod-cart-add" onclick="quickAddCart(${realIndex}, event)">
            <i class="fa-solid fa-basket-shopping"></i> + Keranjang
          </button>
          <button class="prod-view" onclick="openDetail(${realIndex})">
            <i class="fa-solid fa-eye"></i> Lihat
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function openDetail(i) {
  currentProd = produk[i];
  currentProdIdx = i;
  modalQty = 1;

  document.getElementById("mImg").style.background = currentProd.bgColor + "33";
  document.getElementById("mImg").innerHTML =
    `<img src="${currentProd.img}" style="max-height:180px;object-fit:contain">`;
  document.getElementById("mName").textContent = currentProd.nama;
  document.getElementById("mManfaat").textContent =
    "KOMPOSISI: " + currentProd.komposisi;

  updateModalTotal();

  document.getElementById("modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

async function init() {
  produk = await getAllProduk();
  renderProduk(produk);
}

init();
