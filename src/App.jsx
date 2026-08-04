import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="produk/:slug" element={<ProductDetail />} />
        {/* User wanted custom routes like /manfaat/:slug, we can support both by routing to the same component */}
        <Route
          path="manfaat/:slug"
          element={<ProductDetail focus="manfaat" />}
        />
        <Route
          path="komposisi/:slug"
          element={<ProductDetail focus="komposisi" />}
        />
      </Route>
    </Routes>
  );
}
