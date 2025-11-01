import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post } from "../services/api";
import Loader from "../components/Loader.jsx";

export default function ProductDetails({ showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    get(`/api/products/${id}`)
      .then((r) => setP(r.data?.product))
      .catch(() => {});
  }, [id]);

  if (!p) return <Loader />;

  const addToCart = async () => {
    if (!size)
      return showToast(
        "warning",
        "Please choose a size before adding to cart."
      );

    try {
      await post("/api/cart", { productId: p._id, qty, size });
      showToast("success", "Added to Cart");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      if (err?.response?.status === 401) {
        showToast("danger", "Please login first");
        navigate("/login");
      }
    }
  };

  const buyNow = async () => {
    if (!size) return showToast("warning", "Please select a size");
    await addToCart();
    navigate("/checkout");
  };

  const addToWish = async () => {
    if (!size) return showToast("warning", "Please choose a size first");

    try {
      await post("/api/wishlist", { productId: p._id, size });
      showToast("success", "Added to Wishlist");
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (err) {
      if (err?.response?.status === 401) {
        showToast("danger", "Please login first");
        navigate("/login");
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* IMAGE */}
        <div className="col-md-5">
          <img
            className="img-fluid rounded w-100 shadow-sm"
            src={p.imageUrl}
            alt={p.name}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-7">
          {/* Title */}
          <h3 className="fw-bold">{p.name}</h3>

          {/* Rating */}
          <div className="text-warning mb-2">
            {"★".repeat(Math.round(p.rating || 4))}{" "}
            <span className="text-muted small">
              ({p.numReviews || 35} reviews)
            </span>
          </div>

          {/* Price */}
          <h4 className="fw-bold text-dark">
            ₹{p.price}{" "}
            <span className="text-muted text-decoration-line-through fs-6">
              ₹{p.originalPrice}
            </span>
          </h4>
          <p className="text-success fw-semibold">50% off</p>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center my-3">
            <strong className="me-2">Quantity:</strong>
            <div className="input-group" style={{ maxWidth: "150px" }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                -
              </button>
              <input
                className="form-control text-center"
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value) || 1))
                }
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Size Buttons */}
          <strong>Size:</strong>
          <div className="d-flex gap-2 mt-2 mb-3">
            {(p.sizes || ["S", "M", "L", "XL"]).map((s) => (
              <button
                key={s}
                className={`btn fw-semibold ${
                  size === s ? "btn-dark text-white" : "btn-outline-secondary"
                }`}
                style={{ minWidth: "52px", borderRadius: "8px" }}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 mb-4">
            <button
              className="btn btn-primary w-50 fw-semibold"
              onClick={buyNow}
            >
              Buy Now
            </button>
            <button
              className="btn btn-outline-primary w-50 fw-semibold"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button className="btn btn-light border" onClick={addToWish}>
              <i className="bi bi-heart fs-5"></i>
            </button>
          </div>

          {/* Icons / Benefits */}
          <div className="d-flex gap-4 text-muted small mb-3">
            <div>↩️ 10-day Return</div>
            <div>💳 COD</div>
            <div>🚚 Free Delivery</div>
            <div>🔒 Secure Pay</div>
          </div>

          {/* Description */}
          <h6 className="fw-bold mb-1">Description:</h6>
          <p className="text-muted">{p.description}</p>
        </div>
      </div>

      {/* Related Items */}
      <h5 className="mt-5 mb-3 fw-bold">More items you may like</h5>
      <div className="row g-3">
        {(p.related || []).map((r) => (
          <div className="col-6 col-md-3" key={r._id}>
            <div className="card border-0 shadow-sm">
              <img className="card-img-top" src={r.imageUrl} alt={r.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
