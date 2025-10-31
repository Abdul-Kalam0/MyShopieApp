import { Link } from "react-router-dom";
import { post } from "../services/api";
import { useState } from "react";
import useToast from "../hooks/useToast"; // Assuming useToast is in a hooks folder; adjust path as needed

export default function ProductCard({ p, onAddedCart, onAddedWishlist }) {
  const [busy, setBusy] = useState(false);
  const [selectedSize, setSelectedSize] = useState(""); // Start empty to enforce selection
  const { show: showToast } = useToast(); // Destructure show as showToast for clarity

  const addCart = async () => {
    if (!selectedSize) {
      showToast("warning", "Please select a size before adding to cart.");
      return;
    }
    try {
      setBusy(true);
      await post("/api/cart", { productId: p._id, qty: 1, size: selectedSize });
      onAddedCart?.(p);
      window.dispatchEvent(new Event("cart-updated"));
      showToast("success", "Added to Cart!"); // Optional: Success notification
    } finally {
      setBusy(false);
    }
  };

  const addWish = async () => {
    if (!selectedSize) {
      showToast("warning", "Please select a size before adding to wishlist.");
      return;
    }
    try {
      setBusy(true);
      await post("/api/wishlist", { productId: p._id, size: selectedSize });
      onAddedWishlist?.(p);
      window.dispatchEvent(new Event("wishlist-updated"));
      showToast("success", "Added to Wishlist!"); // Optional: Success notification
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card h-100 card-hover position-relative">
      {p.discountPercent ? (
        <span className="badge text-bg-danger badge-discount">
          {p.discountPercent}% off
        </span>
      ) : null}
      <Link className="text-decoration-none text-dark" to={`/product/${p._id}`}>
        <img
          className="card-img-top product-img"
          src={p.imageUrl}
          alt={p.name}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <Link
          className="text-decoration-none text-dark"
          to={`/product/${p._id}`}
        >
          <h6 className="card-title">{p.name}</h6>
        </Link>
        <div className="mb-2">
          <strong>₹{p.price}</strong>{" "}
          {p.originalPrice ? (
            <span className="text-muted text-decoration-line-through small">
              ₹{p.originalPrice}
            </span>
          ) : null}
        </div>
        <div className="text-warning mb-2">
          {"★".repeat(Math.round(p.rating || 0))}
          <span className="text-muted small"> ({p.numReviews || 0})</span>
        </div>
        <div className="mb-2">
          <label className="form-label small">Size:</label>
          <select
            className="form-select form-select-sm"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>{" "}
            {/* Empty option to enforce selection */}
            {(p.sizes || ["S", "M", "L", "XL"]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-auto d-flex gap-2">
          <button
            disabled={busy}
            className="btn btn-primary w-100"
            onClick={addCart}
          >
            Add to Cart
          </button>
          <button
            disabled={busy}
            className="btn btn-outline-secondary"
            onClick={addWish}
          >
            <i className="bi bi-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
