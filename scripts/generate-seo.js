import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { products } from "../src/data/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("index.html not found in dist. Run build first.");
  process.exit(1);
}

const template = fs.readFileSync(indexPath, "utf-8");
const routes = ["produk", "manfaat", "komposisi"];

products.forEach((product) => {
  routes.forEach((route) => {
    const dir = path.join(distDir, route, product.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const title = `${product.nama} - Dapoer Niswah`;
    const description = product.manfaat;
    const url = `https://dapoerniswah.vercel.app/${route}/${product.slug}`;
    const image = product.img;

    let html = template;

    // Replace title
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

    // Replace meta description
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/g,
      `<meta name="description" content="${description}" />`,
    );

    // Replace og tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/g,
      `<meta property="og:title" content="${title}" />`,
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/g,
      `<meta property="og:description" content="${description}" />`,
    );
    html = html.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/g,
      `<meta property="og:image" content="${image}" />`,
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/g,
      `<meta property="og:url" content="${url}" />`,
    );

    // Replace twitter tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/g,
      `<meta name="twitter:title" content="${title}" />`,
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/g,
      `<meta name="twitter:description" content="${description}" />`,
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/g,
      `<meta name="twitter:image" content="${image}" />`,
    );
    html = html.replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/>/g,
      `<meta name="twitter:url" content="${url}" />`,
    );

    fs.writeFileSync(path.join(dir, "index.html"), html);
  });
});

console.log("✅ SEO static files generated successfully for products!");
