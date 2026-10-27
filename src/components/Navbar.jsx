
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `block py-3 text-sm font-semibold transition ${
      isActive ? "text-travel" : "text-slate-600 hover:text-travel"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-travel text-white">
            <Plane size={21} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Travel<span className="text-travel">Nest</span>
          </span>
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/destinations" className={navClass}>
            Destinations
          </NavLink>
          <NavLink to="/my-bookings" className={navClass}>
            My Bookings
          </NavLink>
          <Link
            to="/destinations"
            className="rounded-lg bg-travel px-5 py-3 text-sm font-bold text-white transition hover:bg-travel-dark"
          >
            Explore Trips
          </Link>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-slate-100 bg-white px-5 pb-5 shadow-xl md:hidden">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/destinations"
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              Destinations
            </NavLink>
            <NavLink
              to="/my-bookings"
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              My Bookings
            </NavLink>
            <Link
              to="/destinations"
              onClick={() => setMenuOpen(false)}
              className="mt-3 block rounded-lg bg-travel px-4 py-3 text-center text-sm font-bold text-white"
            >
              Explore Trips
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
