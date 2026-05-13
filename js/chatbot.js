const toggleBtn = document.getElementById("chatToggleBtn");
const closeBtn = document.getElementById("chatCloseBtn");
const chatWindow = document.getElementById("chatWindow");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("chatSendBtn");
const chatBadge = document.getElementById("chatBadge");

let isOpen = false;
let isTyping = false;
let unreadCount = 0;

// Get products from global
const products = produk;

// Helper: Get base product name (remove size)
function getBaseProductName(fullName) {
  return fullName.replace(/\s*\([^)]*\)/, "").trim();
}

// Helper: Parse range request like "produk 1 sampai 5" or "tampilkan 3 produk"
function parseRangeRequest(query) {
  // Pattern: "tampilkan X produk" or "produk X" or "X produk"
  let match = query.match(/(?:tampilkan|lihat|show)?\s*(\d+)\s*(produk|item)/i);
  if (match) {
    const count = parseInt(match[1]);
    if (count > 0 && count <= products.length) {
      return { type: "count", start: 0, end: count };
    }
  }

  // Pattern: "produk X sampai Y" or "X sampai Y"
  match = query.match(/(?:produk\s+)?(\d+)\s*(?:sampai|to|-|s\/d|sd)\s*(\d+)/i);
  if (match) {
    let start = parseInt(match[1]) - 1; // 1-indexed to 0-indexed
    let end = parseInt(match[2]);
    if (start >= 0 && end <= products.length && start < end) {
      return { type: "range", start: start, end: end };
    }
  }

  // Pattern: "produk index X" or "produk ke X"
  match = query.match(/(?:produk|index|ke-?)\s*(\d+)/i);
  if (match) {
    const idx = parseInt(match[1]) - 1;
    if (idx >= 0 && idx < products.length) {
      return { type: "single", index: idx };
    }
  }

  return null;
}

// Render multiple products as horizontal scroll
function renderMultipleProducts(productsList, title) {
  const container = document.createElement("div");
  container.className = "message bot";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  let html = `<div><strong>${title}</strong> (${productsList.length} produk)</div>`;
  html += `<div class="horizontal-products-container">
                          <div class="products-scroll">`;

  productsList.forEach((product, idx) => {
    const productIndex = products.indexOf(product);
    const escapedName = product.nama.replace(/'/g, "\\'");
    const displayName =
      product.nama.length > 40
        ? product.nama.substring(0, 37) + "..."
        : product.nama;

    html += `
                      <div class="product-card-chat">
                          <img src="${product.img || "assets/img/logo.png"}" alt="${product.nama}" onerror="this.src='assets/img/logo.png'">
                          <div class="product-info">
                              <div class="product-name" title="${product.nama}">${displayName}</div>
                              <div class="product-size">${product.ukuran || product.kategori}</div>
                              <div class="product-price">${product.harga}</div>
                              <div class="product-actions">
                                  <button class="btn-cart-chat" onclick="window.addToCartFromChat(${productIndex})">
                                      <i class="fas fa-cart-plus"></i>
                                       Cart
                                  </button>
                                  <a href="https://wa.me/6285370473784?text=Halo Dapoer Niswah, saya tertarik dengan ${encodeURIComponent(escapedName)}" target="_blank" class="btn-wa-chat">
                                        <i class="fab fa-whatsapp"></i>
                                      WA
                                  </a>
                              </div>
                          </div>
                      </div>
                  `;
  });

  html += `</div></div>`;
  html += `<div class="scroll-hint">
                          <span>↔️</span> Geser ke samping untuk lihat produk lainnya <span>↔️</span>
                      </div>`;

  bubble.innerHTML = html;
  container.appendChild(bubble);

  // Add timestamp
  const timeSpan = document.createElement("div");
  timeSpan.className = "message-time";
  timeSpan.style.fontSize = "10px";
  timeSpan.style.color = "var(--coklat-muda)";
  timeSpan.style.marginTop = "4px";
  timeSpan.textContent = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  container.appendChild(timeSpan);

  return container;
}

// Render single product
function renderSingleProduct(product) {
  const container = document.createElement("div");
  container.className = "message bot";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  const productIndex = products.indexOf(product);
  const escapedName = product.nama.replace(/'/g, "\\'");

  bubble.innerHTML = `
                  <div><strong>${getBaseProductName(product.nama)}</strong></div>
                  <div class="single-product-card">
                      <img src="${product.img || "assets/img/logo.png"}" alt="${product.nama}" onerror="this.src='assets/img/logo.png'">
                      <div class="product-info">
                          <div class="product-name">${product.nama}</div>
                          <div class="product-desc">${(product.deskripsi || product.manfaat || "").substring(0, 100)}${(product.deskripsi || product.manfaat || "").length > 100 ? "..." : ""}</div>
                          <div class="product-price">${product.harga}</div>
                          <div class="product-actions">
                              <button class="btn-cart-chat" onclick="window.addToCartFromChat(${productIndex})">
                                  <i class="fas fa-cart-plus"></i>
                                  Tambah ke Keranjang
                              </button>
                              <a href="https://wa.me/6285370473784?text=Halo Dapoer Niswah, saya tertarik dengan ${encodeURIComponent(escapedName)}" target="_blank" class="btn-wa-chat">
                                    <i class="fab fa-whatsapp"></i>
                                  Pesan via WA
                              </a>
                          </div>
                      </div>
                  </div>
              `;

  container.appendChild(bubble);

  const timeSpan = document.createElement("div");
  timeSpan.className = "message-time";
  timeSpan.style.fontSize = "10px";
  timeSpan.style.color = "var(--coklat-muda)";
  timeSpan.style.marginTop = "4px";
  timeSpan.textContent = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  container.appendChild(timeSpan);

  return container;
}

// Add text message
function addTextMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML = text.replace(/\n/g, "<br>");

  messageDiv.appendChild(bubble);

  const timeSpan = document.createElement("div");
  timeSpan.className = "message-time";
  timeSpan.style.fontSize = "10px";
  timeSpan.style.color = "var(--coklat-muda)";
  timeSpan.style.marginTop = "4px";
  timeSpan.textContent = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  messageDiv.appendChild(timeSpan);

  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

function addTypingIndicator() {
  if (isTyping) return;
  isTyping = true;

  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot";
  typingDiv.id = "typingIndicator";
  typingDiv.innerHTML = `
                  <div class="typing-indicator">
                      <div class="typing-dot"></div>
                      <div class="typing-dot"></div>
                      <div class="typing-dot"></div>
                  </div>
              `;
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

function removeTypingIndicator() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
  isTyping = false;
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process user response
function processResponse(userMessage) {
  const query = userMessage.toLowerCase().trim();

  // Greetings
  if (query.match(/^(hai|halo|hey|hi|selamat|pagi|siang|malam)$/)) {
    addTextMessage(
      "Halo! Senang sekali bisa menyapa Anda. Mau tanya tentang jamu sehat kami hari ini? 😊",
      "bot",
    );
    return;
  }

  // Help
  if (query.match(/^(help|bantuan|menu|tolong)$/)) {
    addTextMessage(
      "📋 **Panduan Penggunaan Chat**\n\n" +
        "**Menampilkan produk berdasarkan index:**\n" +
        "• `tampilkan 3 produk` - Lihat 3 produk pertama\n" +
        "• `produk 1 sampai 5` - Lihat produk index 1-5\n" +
        "• `produk ke 2` - Lihat produk index ke-2\n\n" +
        "**Mencari produk:**\n" +
        "• `cari kunyit` - Cari produk dengan kata kunci\n" +
        "• `kunyit jahe merah` - Cari produk spesifik\n\n" +
        "**Lainnya:**\n" +
        "• `hai` - Sapaan\n" +
        "• `help` - Bantuan ini",
      "bot",
    );
    return;
  }

  // Check for range/count request first
  const rangeRequest = parseRangeRequest(query);
  if (rangeRequest) {
    if (rangeRequest.type === "count") {
      const productsToShow = products.slice(
        rangeRequest.start,
        rangeRequest.end,
      );
      if (productsToShow.length > 0) {
        const productContainer = renderMultipleProducts(
          productsToShow,
          `📦 Menampilkan ${productsToShow.length} produk pertama`,
        );
        chatMessages.appendChild(productContainer);
        scrollToBottom();
        enableHorizontalScroll();
        return;
      }
    } else if (rangeRequest.type === "range") {
      const productsToShow = products.slice(
        rangeRequest.start,
        rangeRequest.end,
      );
      if (productsToShow.length > 0) {
        const productContainer = renderMultipleProducts(
          productsToShow,
          `📦 Menampilkan produk index ${rangeRequest.start + 1} sampai ${rangeRequest.end}`,
        );
        chatMessages.appendChild(productContainer);
        scrollToBottom();
        enableHorizontalScroll();
        return;
      }
    } else if (rangeRequest.type === "single") {
      const product = products[rangeRequest.index];
      if (product) {
        const productContainer = renderSingleProduct(product);
        chatMessages.appendChild(productContainer);
        scrollToBottom();
        return;
      }
    }
  }

  // Search by keyword
  const searchKeywords = ["cari", "search", "temukan", "lihat"];
  let searchTerm = null;

  for (const kw of searchKeywords) {
    if (query.startsWith(kw)) {
      searchTerm = query.replace(kw, "").trim();
      break;
    }
  }

  if (searchTerm) {
    const matchedProducts = products.filter(
      (p) =>
        p.nama.toLowerCase().includes(searchTerm) ||
        getBaseProductName(p.nama).toLowerCase().includes(searchTerm),
    );

    if (matchedProducts.length > 0) {
      const productContainer = renderMultipleProducts(
        matchedProducts,
        `🔍 Hasil pencarian untuk "${searchTerm}"`,
      );
      chatMessages.appendChild(productContainer);
      scrollToBottom();
      enableHorizontalScroll();
      return;
    } else {
      addTextMessage(
        `Maaf, tidak ada produk yang cocok dengan kata kunci "${searchTerm}". Coba kata kunci lain seperti: kunyit, jahe, kencur, temulawak, beras kencur.`,
        "bot",
      );
      return;
    }
  }

  // Direct product name search
  const matchedProducts = products.filter(
    (p) =>
      p.nama.toLowerCase().includes(query) ||
      getBaseProductName(p.nama).toLowerCase().includes(query),
  );

  if (matchedProducts.length > 0) {
    if (matchedProducts.length === 1) {
      const productContainer = renderSingleProduct(matchedProducts[0]);
      chatMessages.appendChild(productContainer);
      scrollToBottom();
    } else {
      const productContainer = renderMultipleProducts(
        matchedProducts,
        `🌿 Menampilkan ${matchedProducts.length} produk yang cocok`,
      );
      chatMessages.appendChild(productContainer);
      scrollToBottom();
      enableHorizontalScroll();
    }
  } else {
    addTextMessage(
      "Mohon maaf, produk yang Anda cari tidak ditemukan. Coba ketik **help** untuk melihat panduan atau coba kata kunci seperti: **kunyit**, **jahe**, **kencur**, **temulawak**. 🙏",
      "bot",
    );
  }
}

// Enable horizontal scroll with mouse drag
function enableHorizontalScroll() {
  setTimeout(() => {
    const containers = document.querySelectorAll(
      ".horizontal-products-container",
    );
    containers.forEach((container) => {
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener("mousedown", (e) => {
        if (e.target.closest(".product-actions")) return;
        isDown = true;
        container.style.cursor = "grabbing";
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("mouseleave", () => {
        isDown = false;
        container.style.cursor = "grab";
      });

      container.addEventListener("mouseup", () => {
        isDown = false;
        container.style.cursor = "grab";
      });

      container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
      });
    });
  }, 100);
}

// Send message
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message || isTyping) return;

  chatInput.value = "";

  addTextMessage(message, "user");
  addTypingIndicator();

  await new Promise((resolve) => setTimeout(resolve, 1500));

  removeTypingIndicator();
  processResponse(message);

  if (unreadCount > 0) {
    unreadCount = 0;
    chatBadge.style.display = "none";
  }
}

// Toggle chat window
function toggleChat() {
  isOpen = !isOpen;
  if (isOpen) {
    chatWindow.classList.add("open");
    setTimeout(() => chatInput.focus(), 300);
    if (unreadCount > 0) {
      unreadCount = 0;
      chatBadge.style.display = "none";
    }
  } else {
    chatWindow.classList.remove("open");
  }
}

function closeChat() {
  isOpen = false;
  chatWindow.classList.remove("open");
}

function addUnread() {
  if (!isOpen) {
    unreadCount++;
    chatBadge.style.display = "flex";
    chatBadge.textContent = unreadCount;
  }
}

// Global function for Add to Cart
window.addToCartFromChat = function (productIndex) {
  if (typeof window.addToCart === "function" && products[productIndex]) {
    const p = products[productIndex];
    window.addToCart(productIndex, p.ukuran, p.harga, p.hargaNum);
    addTextMessage(
      `✅ **${p.nama}** telah ditambahkan ke keranjang belanja!`,
      "bot",
    );
  } else {
    addTextMessage("✅ Produk berhasil ditambahkan ke keranjang!", "bot");
  }
};

// Event listeners
toggleBtn.addEventListener("click", toggleChat);
closeBtn.addEventListener("click", closeChat);
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Initial unread after 3 seconds
setTimeout(() => {
  if (!isOpen) addUnread();
}, 3000);
