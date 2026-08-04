import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartPanel from '../components/CartPanel';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-krem)]">
      <Navbar />
      <main className="flex-1 mt-16">
        {/* We use React Router's Outlet to render the active page here */}
        <Outlet />
      </main>
      <Footer />
      <CartPanel />
    </div>
  );
}
