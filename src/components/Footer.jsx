
import { Link } from "react-router-dom";
import { Plane, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3 text-xl font-extrabold text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-travel">
              <Plane size={21} />
            </span>
            Travel<span className="-ml-3 text-emerald-400">Nest</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            Discover amazing places, explore memorable journeys, and plan your next adventure with TravelNest.
          </p>
        </div>

        <div>
          <h3 className="mb-5 font-bold text-white">Quick Links</h3>
          <div className="flex flex-col items-start gap-4 text-sm">
            <Link className="hover:text-emerald-400" to="/">Home</Link>
            <Link className="hover:text-emerald-400" to="/destinations">Destinations</Link>
            <Link className="hover:text-emerald-400" to="/my-bookings">My Bookings</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-bold text-white">Contact Us</h3>
          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <p className="flex items-center gap-3"><MapPin size={17} /> Hyderabad, India</p>
            <p className="flex items-center gap-3"><Mail size={17} /> hello@travelnest.example</p>
            <p className="flex items-center gap-3"><Phone size={17} /> +91 90000 00000</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} TravelNest. Demo travel booking website.
      </div>
    </footer>
  );
}
