
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Compass } from "lucide-react";
import packages from "../data/packages";
import PackageCard from "../components/PackageCard";

export default function Destinations() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("recommended");

  const filtered = useMemo(() => {
    let result = packages.filter((item) => {
      const term = search.toLowerCase().trim();
      const matchesSearch =
        !term ||
        `${item.title} ${item.destination} ${item.country} ${item.category}`
          .toLowerCase()
          .includes(term);

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesBudget =
        budget === "All" ||
        (budget === "under40000" && item.price < 40000) ||
        (budget === "40000to60000" && item.price >= 40000 && item.price <= 60000) ||
        (budget === "above60000" && item.price > 60000);

      return matchesSearch && matchesCategory && matchesBudget;
    });

    if (sort === "priceLow") result.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, category, budget, sort]);

  function updateSearch(value) {
    setSearch(value);
    const next = new URLSearchParams(params);
    if (value.trim()) next.set("search", value);
    else next.delete("search");
    setParams(next, { replace: true });
  }

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setBudget("All");
    setSort("recommended");
    setParams({}, { replace: true });
  }

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-50 to-slate-50 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-travel">
            <Compass size={16} /> FIND YOUR NEXT ADVENTURE
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Explore destinations
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
            Discover amazing places and find a package that matches your travel style and budget.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-9 grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 sm:col-span-2">
            <Search size={18} className="shrink-0 text-travel" />
            <input
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Search destinations or packages"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
            />
          </label>

          <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
            <SlidersHorizontal size={16} className="shrink-0 text-travel" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-transparent py-3 text-xs outline-none">
              <option value="All">All categories</option>
              <option value="Beach">Beach</option>
              <option value="Adventure">Adventure</option>
              <option value="City">City</option>
              <option value="Luxury">Luxury</option>
              <option value="Nature">Nature</option>
            </select>
          </label>

          <label className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3">
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-transparent py-3 text-xs outline-none">
              <option value="All">All budgets</option>
              <option value="under40000">Under ₹40,000</option>
              <option value="40000to60000">₹40,000–₹60,000</option>
              <option value="above60000">Above ₹60,000</option>
            </select>
          </label>

          <label className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3">
            <span className="mr-2 shrink-0 text-xs text-slate-500">Sort:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full bg-transparent py-3 text-xs outline-none">
              <option value="recommended">Recommended</option>
              <option value="priceLow">Price: low to high</option>
              <option value="priceHigh">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Available travel packages</h2>
            <p className="mt-1 text-sm text-slate-500">{filtered.length} package(s) found</p>
          </div>
          <button onClick={resetFilters} className="text-sm font-bold text-travel hover:text-travel-dark">
            Reset filters
          </button>
        </div>

        {filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => <PackageCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-16 text-center">
            <Search size={35} className="mx-auto text-travel" />
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">No packages found</h3>
            <p className="mt-2 text-sm text-slate-500">Try a different destination, category, or budget.</p>
            <button onClick={resetFilters} className="mt-5 rounded-lg bg-travel px-5 py-3 text-sm font-bold text-white">
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
