import { useEffect, useState } from "react";

export default function FiltersSidebar({ applied, onChange, onClear }) {
  const [local, setLocal] = useState(applied || {});

  useEffect(() => setLocal(applied || {}), [applied]);

  const update = (patch) => {
    const next = { ...local, ...patch };
    setLocal(next);
    onChange?.(next);
  };

  return (
    <div
      className="p-3 rounded shadow-sm bg-white"
      style={{ border: "1px solid #e5e5e5", minWidth: "240px" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">Filters</h5>

        <button
          className="btn btn-sm text-danger fw-semibold"
          onClick={onClear}
          style={{ fontSize: "0.85rem" }}
        >
          Clear ✕
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Price</h6>

        {[
          { id: "under500", label: "Under ₹500", val: 500 },
          { id: "under1000", label: "Under ₹1000", val: 1000 },
          { id: "under2000", label: "Under ₹2000", val: 2000 },
        ].map((item) => (
          <div className="form-check mb-1" key={item.id}>
            <input
              className="form-check-input"
              type="radio"
              name="priceRange"
              id={item.id}
              checked={local.maxPrice === item.val && !local.minPrice}
              onChange={() =>
                update({ maxPrice: item.val, minPrice: undefined })
              }
            />
            <label className="form-check-label" htmlFor={item.id}>
              {item.label}
            </label>
          </div>
        ))}

        <div className="form-check mt-1">
          <input
            className="form-check-input"
            type="radio"
            name="priceRange"
            id="above2000"
            checked={local.minPrice === 2000 && !local.maxPrice}
            onChange={() => update({ minPrice: 2000, maxPrice: undefined })}
          />
          <label className="form-check-label" htmlFor="above2000">
            All
          </label>
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Category</h6>

        {(local.categoriesList || []).map((c) => (
          <div className="form-check mb-1" key={c}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={(local.category || []).includes(c)}
              id={`c-${c}`}
              onChange={(e) => {
                const set = new Set(local.category || []);
                e.target.checked ? set.add(c) : set.delete(c);
                update({ category: Array.from(set) });
              }}
            />
            <label
              className="form-check-label text-capitalize"
              htmlFor={`c-${c}`}
            >
              {c}
            </label>
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Minimum Rating</h6>

        <input
          type="range"
          className="form-range"
          min="0"
          max="5"
          step="0.5"
          value={local.minRating || 0}
          onChange={(e) => update({ minRating: Number(e.target.value) })}
        />

        <div className="badge bg-light text-dark fw-semibold">
          ⭐ {local.minRating || 0}+
        </div>
      </div>

      {/* Sort */}
      <div className="mb-2">
        <h6 className="fw-semibold mb-2">Sort by</h6>

        <div className="form-check mb-1">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="sort-asc"
            checked={local.sort === "asc"}
            onChange={() => update({ sort: "asc" })}
          />
          <label className="form-check-label" htmlFor="sort-asc">
            Price: Low → High
          </label>
        </div>

        <div className="form-check mb-1">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="sort-desc"
            checked={local.sort === "desc"}
            onChange={() => update({ sort: "desc" })}
          />
          <label className="form-check-label" htmlFor="sort-desc">
            Price: High → Low
          </label>
        </div>
      </div>
    </div>
  );
}
