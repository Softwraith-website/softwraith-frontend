import { Outlet } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";


export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
