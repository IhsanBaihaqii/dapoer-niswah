const produk = [
  {
    nama: "Induk Kunyit Jahe Merah (60 mL)",
    img: "assets/img/produk/induk-kunyit-jahe-merah.png",
    kategori: "stamina",
    badge: "Terlaris",
    bgColor: "#F5C518",
    deskripsi: "Meningkatkan daya tahan tubuh, stamina dan kinerja otak.",
    manfaat: "Meningkatkan daya tahan tubuh, stamina, dan kinerja otak.",
    ukuran: "60 mL",
    harga: "Rp 8.000",
    hargaNum: 8000,
  },

  {
    nama: "Induk Kunyit Jahe Merah (250 mL)",
    img: "assets/img/produk/induk-kunyit-jahe-merah.png",
    kategori: "stamina",
    badge: "Favorit",
    bgColor: "#F5C518",
    deskripsi:
      "Kombinasi dahsyat kunyit induk dan jahe merah pilihan untuk vitalitas optimal.",
    manfaat: "Meningkatkan daya tahan tubuh, stamina, dan kinerja otak.",
    ukuran: "250 mL",
    harga: "Rp 30.000",
    hargaNum: 30000,
  },

  {
    nama: "Induk Kunyit Jahe Merah (500 mL)",
    img: "assets/img/produk/induk-kunyit-jahe-merah.png",
    kategori: "stamina",
    badge: "Favorit",
    bgColor: "#F5C518",
    deskripsi:
      "Kombinasi dahsyat kunyit induk dan jahe merah pilihan untuk vitalitas optimal.",
    manfaat: "Meningkatkan daya tahan tubuh, stamina, dan kinerja otak.",
    ukuran: "500 mL",
    harga: "Rp 50.000",
    hargaNum: 50000,
  },

  {
    nama: "Jamu Bersalin",
    img: "assets/img/produk/jamu-bersalin.png",
    kategori: "wanita",
    badge: "Eksklusif",
    bgColor: "#A0622A",
    deskripsi:
      "Rahasia kecantikan dan kesehatan kewanitaan dari tanaman manjakani pilihan.",
    manfaat:
      "Menjaga kesehatan organ intim wanita dan meningkatkan kepercayaan diri.",
    ukuran: "60 mL",
    harga: "Rp 30.000",
    hargaNum: 30000,
  },

  {
    nama: "Beras Kencur",
    img: "assets/img/produk/beras-kencur.png",
    kategori: "stamina",
    badge: null,
    bgColor: "#D4A017",
    deskripsi: "Minuman tradisional segar beras kencur manis yang menyehatkan.",
    manfaat: "Menambah nafsu makan dan meningkatkan stamina tubuh.",
    ukuran: "250 mL",
    harga: "Rp 30.000",
    hargaNum: 30000,
  },

  {
    nama: "Pati Kunyit",
    img: "assets/img/produk/pati-kunyit.png",
    kategori: "rimpang",
    badge: null,
    bgColor: "#F5C518",
    deskripsi: "Ekstrak pati kunyit murni dengan konsentrasi kurkumin tinggi.",
    manfaat: "Antioksidan kuat untuk menjaga kesehatan hati dan imunitas.",
    ukuran: "250 mL",
    harga: "Rp 30.000",
    hargaNum: 30000,
  },

  {
    nama: "Kunir Singset",
    img: "assets/img/produk/kunir-singset.png",
    kategori: "wanita",
    badge: "Populer",
    bgColor: "#E8621A",
    deskripsi: "Formula khusus kunir untuk tubuh singset dan kecantikan alami.",
    manfaat: "Membantu menjaga berat badan ideal dan mengencangkan tubuh.",
    ukuran: "250 mL",
    harga: "Rp 30.000",
    hargaNum: 30000,
  },

  {
    nama: "Temulawak",
    img: "assets/img/produk/temulawak.png",
    kategori: "rimpang",
    badge: null,
    bgColor: "#A0622A",
    deskripsi:
      "Jamu temulawak tradisional untuk kesehatan hati dan nafsu makan.",
    manfaat: "Menjaga fungsi hati dan meningkatkan nafsu makan.",
    ukuran: "250 mL",
    harga: "Rp 30.000",
    hargaNum: 30000,
  },

  {
    nama: "Jamu Bersalin",
    img: "assets/img/produk/jamu-bersalin.png",
    kategori: "wanita",
    badge: "Spesial",
    bgColor: "#6B3A1F",
    deskripsi: "Ramuan khusus ibu pasca melahirkan untuk pemulihan optimal.",
    manfaat: "Membantu pemulihan tubuh dan memperlancar ASI.",
    ukuran: "250 mL",
    harga: "Rp 30.000",
    hargaNum: 30000,
  },

  {
    nama: "Jamu Rimpang",
    img: "assets/img/produk/jamu-rimpang.png",
    kategori: "rimpang",
    badge: null,
    bgColor: "#2E1503",
    deskripsi: "Perpaduan rempah rimpang lengkap untuk kesehatan menyeluruh.",
    manfaat: "Meningkatkan imunitas dan melancarkan sirkulasi darah.",
    ukuran: "250 mL",
    harga: "Rp 30.000",
    hargaNum: 30000,
  },

  {
    nama: "Jamu Celup",
    img: "assets/img/produk/jamu-celup.png",
    kategori: "khusus",
    badge: "Praktis",
    bgColor: "#E8621A",
    deskripsi: "Jamu tradisional dalam kemasan celup yang praktis diseduh.",
    manfaat: "Membantu relaksasi dan menjaga kebugaran tubuh.",
    ukuran: "per sachet",
    harga: "Rp 35.000",
    hargaNum: 35000,
  },

  {
    nama: "Bawang Putih Tunggal",
    img: "assets/img/produk/bawang-putih-tunggal.png",
    kategori: "khusus",
    badge: "Langka",
    bgColor: "#A0622A",
    deskripsi: "Ekstrak bawang putih tunggal premium dengan khasiat tinggi.",
    manfaat: "Menurunkan kolesterol, menjaga kesehatan jantung dan imunitas.",
    ukuran: "60 mL",
    harga: "Rp 35.000",
    hargaNum: 35000,
  },
];

// ── RENDER PRODUK ──
function renderProduk(data) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  data.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "prod-card";

    card.innerHTML = `
      <div class="prod-img-wrap" style="background:${p.bgColor}22;">
        <img src="${p.img}" alt="${p.nama}" style="width:100%;height:100%;object-fit:contain;">
        ${p.badge ? `<div class="prod-badge">${p.badge}</div>` : ""}
      </div>

      <div class="prod-body">
        <h3>${p.nama}</h3>
        <p>${p.deskripsi}</p>

        <div class="prod-sizes">
          <span class="size-chip">${p.ukuran}</span>
        </div>

        <div class="prod-price">
          ${formatNum(p.harga)}
        </div>

        <div class="prod-actions">
          <button class="prod-cart-add" onclick="quickAddCart(${i},event)">
            <i class="fa-solid fa-basket-shopping"></i> + Keranjang
          </button>

          <button class="prod-view" onclick="openDetail(${i})">
            <i class="fa-solid fa-eye"></i> Lihat
          </button>

        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}
