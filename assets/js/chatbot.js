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
window.loadChatBot = function () {
  const products = window.produk;

  //  AI RESPONSE PARSER
  function parseAIResponse(response) {
    try {
      // jika sudah object
      if (typeof response === "object") {
        return response;
      }

      // convert ke string
      let text = String(response).trim();

      // hapus markdown AI
      text = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      // coba parse normal
      try {
        return JSON.parse(text);
      } catch {}

      // ambil object JSON pertama
      const first = text.indexOf("{");
      const last = text.lastIndexOf("}");

      if (first !== -1 && last !== -1) {
        text = text.slice(first, last + 1);
      }

      // fix escaped quotes
      if (text.startsWith('"') && text.endsWith('"')) {
        text = text.slice(1, -1);

        text = text.replace(/\\"/g, '"');
        text = text.replace(/\\\\/g, "\\");
      }

      return JSON.parse(text);
    } catch (err) {
      console.error("JSON Parse Error:", err);

      return {
        error: true,
        pesan: "Maaf kak, terjadi kesalahan saat memproses respon 🙏",
        produk: false,
      };
    }
  }

  //  API REQUEST
  function getResponse(text) {
    return fetch(
      `https://dapoerniswah.vercel.app/api/chat?text=${encodeURIComponent(text)}`,
    )
      .then((res) => res.json())
      .then(parseAIResponse)
      .catch((err) => {
        console.error("Fetch Error:", err);
        return {
          error: true,
          pesan: "Maaf kak, terjadi kesalahan saat memproses respon AI 🙏",
          produk: false,
        };
      });
  }

  //  HELPER
  function getBaseProductName(fullName) {
    return fullName.replace(/\s*\([^)]*\)/, "").trim();
  }

  //  RENDER MULTIPLE PRODUCTS
  function renderMultipleProducts(productsList, title) {
    const container = document.createElement("div");
    container.className = "message bot";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    let html = `<div><strong>${title}</strong></div>`;

    html += `
    <div class="horizontal-products-container">
      <div class="products-scroll">
  `;

    productsList.forEach((product) => {
      const productIndex = products.findIndex((p) => p.nama === product.nama);

      const escapedName = product.nama.replace(/'/g, "\\'");

      html += `
      <div class="product-card-chat">
        <img 
          src="${product.img || "assets/img/logo.png"}" 
          alt="${product.nama}"
          onerror="this.src='assets/img/logo.png'"
        >

        <div class="product-info">
          <div class="product-name">
            ${product.nama}
          </div>

          <div class="product-price">
            ${product.hargaNum !== undefined ? formatNum(product.hargaNum) : ""}
          </div>

          <div class="product-actions">
            <button 
              class="btn-cart-chat"
              onclick="window.addToCartFromChat(${productIndex})"
            >
              Cart
            </button>

            <a
              href="https://wa.me/6285370473784?text=Halo Dapoer Niswah, saya tertarik dengan ${encodeURIComponent(escapedName)}"
              target="_blank"
              class="btn-wa-chat"
            >
              WA
            </a>
          </div>
        </div>
      </div>
    `;
    });

    html += `
      </div>
    </div>
  `;

    bubble.innerHTML = html;

    container.appendChild(bubble);

    return container;
  }

  //  RENDER SINGLE PRODUCT
  function renderSingleProduct(product) {
    const container = document.createElement("div");
    container.className = "message bot";
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    const productIndex = products.findIndex((p) => p.nama === product.nama);
    const escapedName = product.nama.replace(/'/g, "\\'");

    bubble.innerHTML = `
    <div>
      <strong>${product.nama}</strong>
    </div>

    <div class="single-product-card">
      <img
        src="${product.img || "assets/img/logo.png"}"
        alt="${product.nama}"
        onerror="this.src='assets/img/logo.png'"
      >

      <div class="product-info">
        <div class="product-price">
          ${product.hargaNum !== undefined ? formatNum(product.hargaNum) : ""}
        </div>

        <div class="product-actions">
          <button
            class="btn-cart-chat"
            onclick="window.addToCartFromChat(${productIndex})"
          >
            Tambah ke Keranjang
          </button>

          <a
            href="https://wa.me/6285370473784?text=Halo Dapoer Niswah, saya tertarik dengan ${encodeURIComponent(escapedName)}"
            target="_blank"
            class="btn-wa-chat"
          >
            Pesan via WA
          </a>
        </div>
      </div>
    </div>
  `;

    container.appendChild(bubble);
    return container;
  }

  //  TEXT MESSAGE
  function addTextMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.innerHTML = text.replace(/\n/g, "<br>");
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    removeTypingIndicator();
    scrollToBottom();
  }

  function renderSocialMedia(sosmed) {
    const container = document.createElement("div");
    container.className = "message bot";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    let html = `
    <div><strong>Hubungi Kami</strong></div>

    <div class="social-card">
  `;

    if (sosmed.wa) {
      html += `
      <a href="${sosmed.wa}" target="_blank" class="social-btn wa">
        📱 WhatsApp
      </a>
    `;
    }

    if (sosmed.ig) {
      html += `
      <a href="${sosmed.ig}" target="_blank" class="social-btn ig">
        📸 Instagram
      </a>
    `;
    }

    if (sosmed.fb) {
      html += `
      <a href="${sosmed.fb}" target="_blank" class="social-btn fb">
        👍 Facebook
      </a>
    `;
    }

    if (sosmed.tiktok) {
      html += `
      <a href="${sosmed.tiktok}" target="_blank" class="social-btn tiktok">
        🎵 TikTok
      </a>
    `;
    }

    html += `
    </div>
  `;

    bubble.innerHTML = html;
    container.appendChild(bubble);
    return container;
  }

  //  TYPING
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

  //  SCROLL
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  //  PROCESS RESPONSE
  async function processResponse(userMessage) {
    const query = userMessage.toLowerCase().trim();

    // sapaan
    if (query.match(/^(hai|halo|hi|hey)$/i)) {
      addTextMessage("Halo kak 👋 Ada yang bisa kami bantu hari ini?", "bot");
      return;
    }

    const response = await getResponse(query);

    if (response.error) {
      addTextMessage(response.pesan, "bot");
      return;
    }

    // tampilkan pesan jika ada
    if (response.pesan) {
      addTextMessage(response.pesan, "bot");
    }

    // tampilkan produk jika ada
    if (Array.isArray(response.produk) && response.produk.length > 0) {
      if (response.produk.length === 1) {
        chatMessages.appendChild(renderSingleProduct(response.produk[0]));
      } else {
        chatMessages.appendChild(
          renderMultipleProducts(response.produk, "Rekomendasi Produk"),
        );
      }
    }

    // tampilkan sosmed jika ada
    if (response.sosmed && typeof response.sosmed === "object") {
      chatMessages.appendChild(renderSocialMedia(response.sosmed));
    }

    removeTypingIndicator();
    scrollToBottom();
  }

  //  SEND MESSAGE
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message || isTyping) return;
    chatInput.value = "";
    addTextMessage(message, "user");
    addTypingIndicator();
    processResponse(message);
    if (unreadCount > 0) {
      unreadCount = 0;
      chatBadge.style.display = "none";
    }
  }

  //  TOGGLE CHAT
  function toggleChat() {
    isOpen = !isOpen;

    if (isOpen) {
      chatWindow.classList.add("open");
      setTimeout(() => chatInput.focus(), 300);
      unreadCount = 0;
      chatBadge.style.display = "none";
    } else {
      chatWindow.classList.remove("open");
    }
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove("open");
  }

  //  BADGE
  function addUnread() {
    if (!isOpen) {
      unreadCount++;
      chatBadge.style.display = "flex";
      chatBadge.textContent = unreadCount;
    }
  }

  //  GLOBAL CART
  window.addToCartFromChat = function (productIndex) {
    if (typeof window.addToCart === "function" && products[productIndex]) {
      const p = products[productIndex];
      window.addToCart(productIndex, p.ukuran, p.hargaNum);

      addTextMessage(`✅ ${p.nama} berhasil ditambahkan ke keranjang`, "bot");
    }
  };

  //  EVENTS
  toggleBtn.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", closeChat);
  sendBtn.addEventListener("click", sendMessage);

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      sendMessage();
    }
  });

  //  INITIAL BADGE
  setTimeout(() => {
    if (!isOpen) addUnread();
  }, 3000);
};
