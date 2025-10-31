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
    <div className="filters-col">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Filters</h6>
        <button className="btn btn-link" onClick={onClear}>
          Clear
        </button>
      </div>

      {/* Price Range Options */}
      <div className="mb-3">
        <div className="form-label">Price Range</div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="priceRange"
            id="under500"
            checked={local.maxPrice === 500 && !local.minPrice}
            onChange={() => update({ maxPrice: 500, minPrice: undefined })}
          />
          <label className="form-check-label" htmlFor="under500">
            Under ₹500
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="priceRange"
            id="under1000"
            checked={local.maxPrice === 1000 && !local.minPrice}
            onChange={() => update({ maxPrice: 1000, minPrice: undefined })}
          />
          <label className="form-check-label" htmlFor="under1000">
            Under ₹1000
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="priceRange"
            id="under2000"
            checked={local.maxPrice === 2000 && !local.minPrice}
            onChange={() => update({ maxPrice: 2000, minPrice: undefined })}
          />
          <label className="form-check-label" htmlFor="under2000">
            Under ₹2000
          </label>
        </div>
        <div className="form-check">
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

      <div className="mb-3">
        <div className="form-label">Category</div>
        {(local.categoriesList || []).map((c) => (
          <div className="form-check" key={c}>
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
            <label className="form-check-label" htmlFor={`c-${c}`}>
              {c}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="form-label">Rating</div>
        <input
          type="range"
          className="form-range"
          min="0"
          max="5"
          step="0.5"
          value={local.minRating || 0}
          onChange={(e) => update({ minRating: Number(e.target.value) })}
        />
        <div className="small text-muted">{local.minRating || 0}+ stars</div>
      </div>

      <div className="mb-3">
        <div className="form-label">Sort by Price</div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="sort-asc"
            checked={local.sort === "asc"}
            onChange={() => update({ sort: "asc" })}
          />
          <label className="form-check-label" htmlFor="sort-asc">
            Low to High
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="sort-desc"
            checked={local.sort === "desc"}
            onChange={() => update({ sort: "desc" })}
          />
          <label className="form-check-label" htmlFor="sort-desc">
            High to Low
          </label>
        </div>
      </div>
    </div>
  );
}
