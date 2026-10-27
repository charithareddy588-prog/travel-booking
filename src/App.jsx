
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import PackageDetails from "./pages/PackageDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
      <p className="mt-3 text-slate-500">Sorry, this page could not be found.</p>
      <a href="/" className="mt-6 inline-flex rounded-lg bg-travel px-5 py-3 text-sm font-bold text-white">
        Back to Home
      </a>
    </section>
  );
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-[60vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
