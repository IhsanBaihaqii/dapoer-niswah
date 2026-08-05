import { products } from "../../src/data/products.js";

export default function handler(req, res) {
  const { slug } = req.query;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return res.status(404).send("Produk tidak ditemukan");
  }

  const title = `${product.nama} | Dapoer Niswah`;

  const description = product.manfaat.slice(0, 160);

  const image = `https://dapoerniswah.vercel.app${product.img}`;

  const html = `
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <title>${title}</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:url"
          content="https://dapoerniswah.vercel.app/produk/${slug}" />

        <meta name="twitter:card" content="summary_large_image" />

        <script>
          window.location.href = "/produk/${slug}";
        </script>
      </head>

      <body>
        <p>Mengalihkan...</p>
      </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
