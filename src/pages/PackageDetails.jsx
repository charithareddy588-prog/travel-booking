
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, MapPin, Clock, Star,
  CheckCircle2, CalendarDays, Users
} from "lucide-react";
import packages from "../data/packages";

export default function PackageDetails() {
  const { id } = useParams();
  const item = packages.find((p) => p.id === Number(id));

  if (!item) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Package not found</h1>
        <Link to="/destinations" className="mt-5 inline-block text-travel">Browse packages</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link to="/destinations" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-travel">
        <ArrowLeft size={17} /> Back to destinations
      </Link>

      <div className="relative h-[300px] overflow-hidden rounded-2xl bg-slate-100 sm:h-[420px]">
        <img src={item.image} alt={item.destination} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-10">
          <span className="rounded-md bg-white px-3 py-1.5 text-xs font-bold text-travel">{item.badge}</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">{item.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/90">
            <MapPin size={17} /> {item.destination}, {item.country}
          </p>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
        <div>
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-4">
            <div><Clock className="mb-3 text-travel" size={21} /><p className="text-xs text-slate-500">Duration</p><p className="mt-1 text-sm font-bold">{item.duration} days</p></div>
            <div><Star className="mb-3 text-amber-500" size={21} /><p className="text-xs text-slate-500">Rating</p><p className="mt-1 text-sm font-bold">{item.rating}/5</p></div>
            <div><CalendarDays className="mb-3 text-travel" size={21} /><p className="text-xs text-slate-500">Travel type</p><p className="mt-1 text-sm font-bold">{item.category}</p></div>
            <div><Users className="mb-3 text-travel" size={21} /><p className="text-xs text-slate-500">Reviews</p><p className="mt-1 text-sm font-bold">{item.reviews}</p></div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-extrabold">About this trip</h2>
            <p className="mt-4 text-sm leading-8 text-slate-500">{item.description}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-extrabold">Your itinerary</h2>
            <div className="mt-6 space-y-5">
              {item.itinerary.map((day, index) => (
                <div key={day} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-travel-light text-sm font-bold text-travel">{index + 1}</span>
                  <p className="pt-2 text-sm leading-6 text-slate-600">{day}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-extrabold">What's included</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {item.inclusions.map((inclusion) => (
                <p key={inclusion} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="shrink-0 text-travel" /> {inclusion}
                </p>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <p className="text-sm text-slate-500">Starting from</p>
          <p className="mt-2 text-3xl font-extrabold text-travel">
            ₹{item.price.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-xs text-slate-500">per person · INR</p>
          <div className="my-6 h-px bg-slate-100" />
          <p className="flex items-center gap-3 text-sm text-slate-600"><Clock size={18} className="text-travel" /> {item.duration} days</p>
          <p className="mt-4 flex items-center gap-3 text-sm text-slate-600"><MapPin size={18} className="text-travel" /> {item.destination}</p>
          <Link to={`/book/${item.id}`} className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-travel px-5 py-4 text-sm font-bold text-white hover:bg-travel-dark">
            Book This Trip <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-center text-xs leading-5 text-slate-500">Demo booking only. No payment is collected.</p>
        </aside>
      </div>
    </section>
  );
}
