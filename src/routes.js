// src/routes.js

import { products } from "./data/products";

const routes = ["/"];

products.forEach((product) => {
  routes.push(`/produk/${product.slug}`);
  routes.push(`/manfaat/${product.slug}`);
  routes.push(`/komposisi/${product.slug}`);
});

export default routes;
