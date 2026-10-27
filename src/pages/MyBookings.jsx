
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CalendarDays, MapPin, Users, Trash2, Plane,
  ClipboardList, ArrowRight
} from "lucide-react";

function readBookings() {
  try {
    const data = JSON.parse(localStorage.getItem("travelnest_bookings") || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function MyBookings() {
  const [bookings, setBookings] = useState(readBookings);
  const [params, setParams] = useSearchParams();
  const [success, setSuccess] = useState(params.get("success") === "1");

  useEffect(() => {
    if (params.has("success")) {
      const next = new URLSearchParams(params);
      next.delete("success");
      setParams(next, { replace: true });
    }
  }, [params, setParams]);

  function cancelBooking(id) {
    const confirmed = window.confirm("Remove this booking from your saved bookings?");
    if (!confirmed) return;

    const updated = bookings.filter((booking) => booking.id !== id);

    try {
      localStorage.setItem("travelnest_bookings", JSON.stringify(updated));
      setBookings(updated);
    } catch {
      window.alert("Unable to update saved bookings. Please check browser storage.");
    }
  }

  return (
    <section className="mx-auto min-h-[550px] max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 p-7 sm:p-10">
        <p className="text-xs font-extrabold tracking-[0.2em] text-travel">YOUR TRAVEL DASHBOARD</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">My Bookings</h1>
        <p className="mt-3 text-sm text-slate-500">Review the trips you have saved in this browser.</p>
      </div>

      {success && (
        <div role="status" className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <span>Your demo booking was saved successfully!</span>
          <button onClick={() => setSuccess(false)} aria-label="Dismiss message" className="text-xl">×</button>
        </div>
      )}

      <div className="mb-6 mt-9 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-3 text-xl font-extrabold text-slate-900">
            <ClipboardList className="text-travel" /> Saved trips
            <span className="grid h-7 min-w-7 place-items-center rounded-full bg-travel-light px-2 text-xs text-travel">{bookings.length}</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500">Your booking information is stored locally.</p>
        </div>
        <Link to="/destinations" className="inline-flex items-center gap-2 rounded-lg bg-travel px-4 py-3 text-sm font-bold text-white hover:bg-travel-dark">
          Explore trips <ArrowRight size={16} />
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-7 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-travel-light text-travel">
            <Plane size={30} />
          </span>
          <h3 className="mt-5 text-xl font-extrabold text-slate-900">No bookings yet</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Your next adventure is waiting. Explore our travel packages and make a demo booking.</p>
          <Link to="/destinations" className="mt-6 rounded-lg bg-travel px-5 py-3 text-sm font-bold text-white hover:bg-travel-dark">Explore Destinations</Link>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <article key={booking.id} className="grid gap-5 rounded-2xl border border-slate-200 p-4 sm:p-5 md:grid-cols-[180px_1fr_auto]">
              <img
                src={booking.image}
                alt={booking.destination}
                className="h-48 w-full rounded-xl object-cover md:h-full md:min-h-44"
              />

              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">{booking.status}</span>
                  <span className="break-all text-xs text-slate-400">{booking.id}</span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">{booking.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin size={16} className="shrink-0 text-travel" />{booking.destination}, {booking.country}</p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-600">
                  <span className="flex items-center gap-2"><CalendarDays size={15} className="text-travel" />{booking.date}</span>
                  <span className="flex items-center gap-2"><Users size={15} className="text-travel" />{booking.travelers} traveler(s)</span>
                </div>

                <p className="mt-4 break-words text-xs text-slate-500">{booking.name} · {booking.email}</p>

                {booking.notes && (
                  <p className="mt-2 text-xs text-slate-500">Request: {booking.notes}</p>
                )}
              </div>

              <div className="flex flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4 md:min-w-40 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-5 md:pt-1">
                <div>
                  <p className="text-xs text-slate-500">Total price</p>
                  <p className="mt-1 text-xl font-extrabold text-travel">₹{Number(booking.total).toLocaleString("en-IN")}</p>
                </div>
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} /> Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-7 text-xs leading-6 text-slate-400">
        Demo notice: bookings are saved in this browser's localStorage. They are not sent to a travel provider or used to reserve real travel services.
      </p>
    </section>
  );
}
