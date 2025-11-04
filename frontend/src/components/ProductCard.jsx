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
    if (!localStorage.getItem("token")) {
      showToast("warning", "Please login");
      return;
    }
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
      showToast("danger", "Failed to add to cart");
    } finally {
      setBusy(false);
    }
  };

  const addWish = async () => {
    if (!localStorage.getItem("token")) {
      showToast("warning", "Please login");
      return;
    }
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
      showToast("danger", "Failed to add to wishlist");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      {p.discountPercent && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
          {p.discountPercent}% off
        </span>
      )}

      <Link to={`/product/${p._id}`} className="text-decoration-none text-dark">
        <img
          src={p.imageUrl}
          className="card-img-top"
          alt={p.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <Link
          className="text-decoration-none text-dark"
          to={`/product/${p._id}`}
        >
          <h6 className="fw-semibold">{p.name}</h6>
        </Link>

        <div className="mb-2">
          <span className="fw-bold text-primary">₹{p.price}</span>{" "}
          {p.originalPrice && (
            <span className="text-muted text-decoration-line-through small">
              ₹{p.originalPrice}
            </span>
          )}
        </div>

        <div className="text-warning mb-2">
          {"★".repeat(Math.round(p.rating || 0))}
          <span className="text-muted small ms-1">({p.numReviews || 0})</span>
        </div>

        {/* Sizes */}
        <div className="mb-2">
          <label className="small fw-semibold mb-1">Size:</label>
          <div className="d-flex flex-wrap gap-2">
            {(p.sizes || ["S", "M", "L", "XL"]).map((s) => (
              <button
                key={s}
                className={`btn btn-sm ${
                  selectedSize === s ? "btn-dark" : "btn-outline-secondary"
                }`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto d-flex flex-column gap-2">
          <button
            disabled={busy}
            className="btn btn-primary w-100"
            onClick={addCart}
          >
            {busy ? "Adding..." : "Add to Cart"}
          </button>

          {/* ✅ Light Wishlist Button */}
          <button
            disabled={busy}
            onClick={addWish}
            className="btn w-100"
            style={{
              border: "1.5px solid #e57373",
              color: "#e57373",
              borderRadius: "10px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              background: "transparent",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <i
              className="bi bi-heart-fill"
              style={{ color: "#e57373", fontSize: "1rem" }}
            ></i>
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
