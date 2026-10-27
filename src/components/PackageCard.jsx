
import { Link } from "react-router-dom";
import { MapPin, Clock, Star, ArrowUpRight } from "lucide-react";

export default function PackageCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/packages/${item.id}`} className="relative block h-56 overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.destination}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-travel shadow">
          {item.badge}
        </span>
      </Link>

      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-travel" />
            {item.destination}, {item.country}
          </span>
          <span className="flex items-center gap-1 font-bold text-amber-500">
            <Star size={14} fill="currentColor" />
            {item.rating}
            <span className="font-normal text-slate-400">({item.reviews})</span>
          </span>
        </div>

        <Link to={`/packages/${item.id}`}>
          <h3 className="mb-3 text-lg font-extrabold text-slate-900 transition group-hover:text-travel">
            {item.title}
          </h3>
        </Link>

        <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-6 text-slate-500">
          {item.description}
        </p>

        <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="mb-1 text-xs text-slate-500">Starting from</p>
            <p className="text-xl font-extrabold text-travel">
              ₹{item.price.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-slate-500"> / person</span>
            </p>
          </div>

          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock size={14} />
            {item.duration} days
          </span>
        </div>

        <Link
          to={`/packages/${item.id}`}
          className="mt-5 flex items-center justify-between text-sm font-bold text-travel hover:text-travel-dark"
        >
          View Package
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
