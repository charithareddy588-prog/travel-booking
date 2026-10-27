
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Headphones,
  Wallet,
  Compass,
  Plane,
  Star,
} from "lucide-react";

import packages from "../data/packages";
import PackageCard from "../components/PackageCard";
import DestinationCard from "../components/DestinationCard";

const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    packages: 12,
  },
  {
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    packages: 18,
  },
  {
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    packages: 9,
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Trusted Travel",
    text: "Explore carefully curated travel experiences.",
  },
  {
    icon: Wallet,
    title: "Great Value",
    text: "Discover exciting trips at transparent prices.",
  },
  {
    icon: Headphones,
    title: "Travel Support",
    text: "Get help planning your next adventure.",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    navigate(
      `/destinations${
        search.trim()
          ? `?search=${encodeURIComponent(search.trim())}`
          : ""
      }`
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[570px] items-center overflow-hidden bg-slate-900 sm:min-h-[620px]">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=90"
          alt="Majestic mountains and scenic travel landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-900/10" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-emerald-100 backdrop-blur">
              <Compass size={15} />
              YOUR NEXT ADVENTURE STARTS HERE
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Discover the world,{" "}
              <span className="text-emerald-300">one journey</span> at a time.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
              Find beautiful destinations, unforgettable experiences, and
              travel packages made for your next great escape.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-8 flex flex-col gap-2 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row sm:items-center sm:rounded-xl"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-2">
                <Search size={20} className="shrink-0 text-travel" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Where would you like to go?"
                  aria-label="Search destinations"
                  className="min-w-0 flex-1 py-3 text-sm text-slate-900 outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-travel px-6 py-4 text-sm font-bold text-white transition hover:bg-travel-dark sm:py-3"
              >
                Explore Trips <ArrowRight size={17} />
              </button>
            </form>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/90">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} /> Trusted experiences
              </span>
              <span className="flex items-center gap-2">
                <Star size={16} /> Curated packages
              </span>
              <span className="flex items-center gap-2">
                <Plane size={16} /> Amazing destinations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-6 border-b border-slate-100 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        {[
          ["50+", "Destinations"],
          ["100+", "Travel experiences"],
          ["4.8/5", "Demo rating"],
          ["24/7", "Travel inspiration"],
        ].map(([value, label]) => (
          <div key={label} className="border-l-2 border-emerald-100 pl-4">
            <p className="text-2xl font-extrabold text-slate-900">{value}</p>
            <p className="mt-1 text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      {/* Popular Destinations - using DestinationCard.jsx */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold tracking-[0.2em] text-travel">
              EXPLORE PLACES
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Popular destinations
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Find inspiration for your next unforgettable journey.
            </p>
          </div>

          <Link
            to="/destinations"
            className="hidden items-center gap-2 text-sm font-bold text-travel hover:text-travel-dark sm:flex"
          >
            View all <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
            />
          ))}
        </div>

        <Link
          to="/destinations"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-travel sm:hidden"
        >
          View all destinations <ArrowRight size={17} />
        </Link>
      </section>

      {/* Featured Packages */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] text-travel">
                HANDPICKED FOR YOU
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Featured packages
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                Start planning your next adventure.
              </p>
            </div>

            <Link
              to="/destinations"
              className="hidden items-center gap-2 text-sm font-bold text-travel sm:flex"
            >
              All packages <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((item) => (
              <PackageCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-extrabold tracking-[0.2em] text-travel">
            WHY TRAVELNEST
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Your journey, made simpler
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Explore at your own pace with clear pricing, convenient planning,
            and inspiring destinations.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-100 p-6 transition hover:shadow-lg"
            >
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-travel-light text-travel">
                <Icon size={23} />
              </span>

              <h3 className="text-lg font-extrabold text-slate-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-emerald-900 to-travel p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-200">
              YOUR NEXT CHAPTER
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              The world is waiting for you.
            </h2>

            <p className="mt-3 text-sm leading-7 text-emerald-50">
              Find your destination and turn your travel plans into an
              adventure.
            </p>
          </div>

          <Link
            to="/destinations"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-4 text-sm font-bold text-travel transition hover:bg-emerald-50"
          >
            Explore Packages <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
