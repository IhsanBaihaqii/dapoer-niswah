import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { products } from "../src/data/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("❌ index.html not found in dist. Run build first.");
  process.exit(1);
}

const template = fs.readFileSync(indexPath, "utf-8");

// ========================
// 1. DEFINE ALL ROUTES
// ========================

// Routes for product pages
const productRoutes = ["produk", "manfaat", "komposisi"];

// Static pages (non-product)
const staticPages = [
  {
    route: "chat",
    title: "Chat Dapoer Niswah",
    description: "Layanan pelanggan dan pemesanan online Dapoer Niswah.",
  },
];

// ========================
// 2. GENERATE PRODUCT PAGES
// ========================

console.log("📦 Generating product pages...");

products.forEach((product) => {
  productRoutes.forEach((route) => {
    const dir = path.join(distDir, route, product.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const title =
      route === "produk"
        ? `${product.nama} - Dapoer Niswah`
        : route === "manfaat"
          ? `Manfaat ${product.nama} - Dapoer Niswah`
          : `Komposisi ${product.nama} - Dapoer Niswah`;

    const description =
      route === "komposisi" ? product.komposisi : product.manfaat;
    const url = `https://dapoerniswah.vercel.app/${route}/${product.slug}`;
    const image = `https://dapoerniswah.vercel.app${product.img}`;

    let html = template;

    // Replace meta tags
    html = replaceMetaTags(html, {
      title,
      description,
      url,
      image,
    });

    // Add canonical URL for product pages
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/g,
      `<link rel="canonical" href="${url}" />`,
    );

    fs.writeFileSync(path.join(dir, "index.html"), html);
  });
});

console.log(
  `✅ Generated ${products.length * productRoutes.length} product pages`,
);

// ========================
// 3. GENERATE STATIC PAGES
// ========================

console.log("📄 Generating static pages...");

staticPages.forEach((page) => {
  const dir = path.join(distDir, page.route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const url = `https://dapoerniswah.vercel.app/${page.route}`;
  const image = "https://dapoerniswah.vercel.app/assets/img/logo.png";

  let html = template;

  // Replace meta tags
  html = replaceMetaTags(html, {
    title: page.title,
    description: page.description,
    url,
    image,
  });

  // Add canonical URL for static pages
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/g,
    `<link rel="canonical" href="${url}" />`,
  );

  fs.writeFileSync(path.join(dir, "index.html"), html);
});

// ========================
// 5. GENERATE SITEMAP
// ========================

console.log("🗺️ Generating sitemap.xml...");

const sitemapPath = path.join(distDir, "sitemap.xml");
const publicSitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
const today = new Date().toISOString().split("T")[0];

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Homepage -->
  <url>
    <loc>https://dapoerniswah.vercel.app/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

// Add static pages to sitemap
staticPages.forEach((page) => {
  sitemapContent += `
  <url>
    <loc>https://dapoerniswah.vercel.app/${page.route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// Add product pages to sitemap
products.forEach((product) => {
  productRoutes.forEach((route) => {
    sitemapContent += `
  <url>
    <loc>https://dapoerniswah.vercel.app/${route}/${product.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });
});

sitemapContent += `\n</urlset>`;

// Write sitemap to dist and public
fs.writeFileSync(sitemapPath, sitemapContent);

// Also save to public for development
const publicDir = path.resolve(__dirname, "../public");
if (fs.existsSync(publicDir)) {
  fs.writeFileSync(publicSitemapPath, sitemapContent);
}

console.log("✅ sitemap.xml generated successfully!");

// ========================
// 6. GENERATE ROBOTS.TXT
// ========================

console.log("🤖 Generating robots.txt...");

const robotsContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: https://dapoerniswah.vercel.app/sitemap.xml

# Disallow admin or private areas
Disallow: /admin/
Disallow: /private/
`;

const robotsPath = path.join(distDir, "robots.txt");
fs.writeFileSync(robotsPath, robotsContent);

if (fs.existsSync(publicDir)) {
  const publicRobotsPath = path.join(publicDir, "robots.txt");
  fs.writeFileSync(publicRobotsPath, robotsContent);
}

console.log("✅ robots.txt generated successfully!");

// ========================
// 7. SUMMARY
// ========================

console.log("\n📊 ======== GENERATION SUMMARY ========");
console.log(`📄 Product pages: ${products.length * productRoutes.length}`);
console.log(`📄 Static pages: ${staticPages.length}`);
console.log(`🗺️ Sitemap: sitemap.xml`);
console.log(`🤖 Robots: robots.txt`);
console.log("✅ All SEO files generated successfully!");
console.log("========================================\n");

// ========================
// HELPER FUNCTIONS
// ========================

function replaceMetaTags(html, { title, description, url, image }) {
  let result = html;

  // Replace title
  result = result.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Replace meta description
  result = result.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/g,
    `<meta name="description" content="${description}" />`,
  );

  // Replace og:title
  result = result.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/g,
    `<meta property="og:title" content="${title}" />`,
  );

  // Replace og:description
  result = result.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/g,
    `<meta property="og:description" content="${description}" />`,
  );

  // Replace og:image
  result = result.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/g,
    `<meta property="og:image" content="${image}" />`,
  );

  // Replace og:url
  result = result.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/g,
    `<meta property="og:url" content="${url}" />`,
  );

  // Replace twitter:title
  result = result.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/g,
    `<meta name="twitter:title" content="${title}" />`,
  );

  // Replace twitter:description
  result = result.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/g,
    `<meta name="twitter:description" content="${description}" />`,
  );

  // Replace twitter:image
  result = result.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/g,
    `<meta name="twitter:image" content="${image}" />`,
  );

  // Replace twitter:url
  result = result.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/g,
    `<meta name="twitter:url" content="${url}" />`,
  );

  // Add og:type if not exists
  if (!result.includes('property="og:type"')) {
    result = result.replace(
      /<\/head>/,
      `<meta property="og:type" content="website" />\n</head>`,
    );
  }

  // Add twitter:card if not exists
  if (!result.includes('name="twitter:card"')) {
    result = result.replace(
      /<\/head>/,
      `<meta name="twitter:card" content="summary_large_image" />\n</head>`,
    );
  }

  return result;
}
