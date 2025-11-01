import { Link } from "react-router-dom";
import { post } from "../services/api";
import { useState } from "react";

export default function ProductCard({
  p,
  onAddedCart,
  onAddedWishlist,
  showToast,
}) {
  const [busy, setBusy] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

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
      showToast("success", "Added to Cart!");
    } catch {
      showToast("danger", "Failed to add to cart. Please try again.");
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
      showToast("success", "Added to Wishlist!");
    } catch {
      showToast("danger", "Failed to add to wishlist. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="card h-100 position-relative shadow-sm"
      style={{ transition: "box-shadow 0.2s ease" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)")
      }
    >
      {p.discountPercent && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
          {p.discountPercent}% off
        </span>
      )}

      <Link className="text-decoration-none text-dark" to={`/product/${p._id}`}>
        <img
          className="card-img-top img-fluid"
          src={p.imageUrl}
          alt={p.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <Link
          className="text-decoration-none text-dark"
          to={`/product/${p._id}`}
        >
          <h6 className="card-title fw-semibold">{p.name}</h6>
        </Link>

        <div className="mb-2">
          <strong className="text-primary">₹{p.price}</strong>{" "}
          {p.originalPrice && (
            <span className="text-muted text-decoration-line-through small">
              ₹{p.originalPrice}
            </span>
          )}
        </div>

        <div className="text-warning mb-3">
          {"★".repeat(Math.round(p.rating || 0))}
          <span className="text-muted small ms-1">({p.numReviews || 0})</span>
        </div>

        {/* SIZE BUTTONS */}
        <div className="mb-3">
          <label className="form-label small fw-semibold mb-2">Size:</label>
          <div className="d-flex gap-2 flex-wrap">
            {(p.sizes || ["S", "M", "L", "XL"]).map((s) => (
              <button
                key={s}
                type="button"
                className={`btn btn-sm border ${
                  selectedSize === s
                    ? "btn-dark text-white shadow-sm"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto d-flex gap-2">
          <button
            disabled={busy}
            className="btn btn-primary flex-fill"
            onClick={addCart}
          >
            {busy ? "Adding..." : "Add to Cart"}
          </button>

          <button
            disabled={busy}
            className="btn btn-outline-secondary"
            onClick={addWish}
          >
            <i className="bi bi-heart text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
