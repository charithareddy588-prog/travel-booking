
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, ShieldCheck } from "lucide-react";
import packages from "../data/packages";

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-travel focus:ring-2 focus:ring-emerald-100";

function readBookings() {
  try {
    const value = JSON.parse(localStorage.getItem("travelnest_bookings") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function getLocalDate(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = packages.find((p) => p.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: getLocalDate(7),
    travelers: "1",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const total = useMemo(
    () => item ? item.price * Number(form.travelers || 1) : 0,
    [item, form.travelers]
  );

  if (!item) {
    return (
      <section className="px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Package not found</h1>
        <Link to="/destinations" className="mt-5 inline-block text-travel">Browse trips</Link>
      </section>
    );
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitError("");
  }

  function validate() {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!/^[0-9+\s()-]{7,20}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid phone number.";
    }
    if (!form.date || form.date < getLocalDate()) {
      next.date = "Choose today or a future travel date.";
    }

    const travelers = Number(form.travelers);
    if (!Number.isInteger(travelers) || travelers < 1 || travelers > 20) {
      next.travelers = "Choose between 1 and 20 travelers.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    try {
      const bookings = readBookings();
      const booking = {
        id: `TN-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        packageId: item.id,
        title: item.title,
        destination: item.destination,
        country: item.country,
        image: item.image,
        date: form.date,
        travelers: Number(form.travelers),
        total,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        notes: form.notes.trim(),
        createdAt: new Date().toISOString(),
        status: "Confirmed",
      };

      localStorage.setItem(
        "travelnest_bookings",
        JSON.stringify([booking, ...bookings])
      );

      navigate("/my-bookings?success=1");
    } catch {
      setSubmitError("Unable to save your booking. Please check your browser storage and try again.");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link to={`/packages/${item.id}`} className="mb-7 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-travel">
        <ArrowLeft size={17} /> Back to package
      </Link>

      <div className="mb-9">
        <p className="text-xs font-extrabold tracking-[0.2em] text-travel">RESERVE YOUR ADVENTURE</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Book your trip</h1>
        <p className="mt-3 text-sm text-slate-500">Enter your details to create a demo booking.</p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-slate-200 p-5 sm:p-8">
          <h2 className="text-xl font-extrabold">Traveler information</h2>
          <p className="mb-7 mt-2 text-sm text-slate-500">Fields marked with * are required.</p>

          <div className="mb-5">
            <label htmlFor="name" className="text-sm font-bold">Full name *</label>
            <input id="name" name="name" value={form.name} onChange={updateField} autoComplete="name" required minLength={2} aria-invalid={!!errors.name} className={inputClass} placeholder="Enter your full name" />
            {errors.name && <p className="mt-2 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="mb-1">
              <label htmlFor="email" className="text-sm font-bold">Email address *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required aria-invalid={!!errors.email} className={inputClass} placeholder="you@example.com" />
              {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div className="mb-1">
              <label htmlFor="phone" className="text-sm font-bold">Phone number *</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" required aria-invalid={!!errors.phone} className={inputClass} placeholder="+91 98765 43210" />
              {errors.phone && <p className="mt-2 text-xs text-red-600">{errors.phone}</p>}
            </div>
          </div>

          <div className="my-8 border-t border-slate-100" />
          <h2 className="text-xl font-extrabold">Trip details</h2>
          <p className="mb-7 mt-2 text-sm text-slate-500">Choose your preferred travel date and group size.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="text-sm font-bold">Travel date *</label>
              <div className="relative">
                <CalendarDays size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-travel" />
                <input id="date" name="date" type="date" min={getLocalDate()} value={form.date} onChange={updateField} required aria-invalid={!!errors.date} className={`${inputClass} pl-10`} />
              </div>
              {errors.date && <p className="mt-2 text-xs text-red-600">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="travelers" className="text-sm font-bold">Number of travelers *</label>
              <select id="travelers" name="travelers" value={form.travelers} onChange={updateField} className={inputClass}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "traveler" : "travelers"}</option>
                ))}
              </select>
              {errors.travelers && <p className="mt-2 text-xs text-red-600">{errors.travelers}</p>}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="notes" className="text-sm font-bold">Special requests (optional)</label>
            <textarea id="notes" name="notes" value={form.notes} onChange={updateField} rows={3} maxLength={500} className={inputClass} placeholder="Share any preferences or requests..." />
          </div>

          {submitError && (
            <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{submitError}</p>
          )}

          <button type="submit" className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-travel px-5 py-4 text-sm font-bold text-white transition hover:bg-travel-dark">
            <CheckCircle2 size={18} /> Confirm Demo Booking
          </button>
          <p className="mt-4 text-center text-xs leading-6 text-slate-500">No payment required. This demo saves your booking in your browser.</p>
        </form>

        <aside className="rounded-2xl border border-slate-200 p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-xl font-extrabold">Booking summary</h2>
          <img src={item.image} alt={item.destination} className="mt-5 h-48 w-full rounded-xl object-cover" />
          <h3 className="mt-4 text-lg font-extrabold">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{item.destination}, {item.country}</p>

          <div className="my-5 space-y-4 border-y border-slate-100 py-5 text-sm">
            <div className="flex justify-between gap-3"><span className="text-slate-500">Price per traveler</span><strong>₹{item.price.toLocaleString("en-IN")}</strong></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Travelers</span><strong>{form.travelers}</strong></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Duration</span><strong>{item.duration} days</strong></div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="text-sm font-bold">Estimated total</span>
            <span className="text-right text-2xl font-extrabold text-travel">₹{total.toLocaleString("en-IN")}</span>
          </div>

          <div className="mt-5 flex gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-900">
            <ShieldCheck size={20} className="shrink-0" />
            <p className="text-xs leading-6">Demo checkout only. No payment details are collected or processed.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
