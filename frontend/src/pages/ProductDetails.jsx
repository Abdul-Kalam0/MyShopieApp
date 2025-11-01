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
    if (!size) return showToast("warning", "Please choose a size");

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
    if (!size) return showToast("warning", "Select size first");

    try {
      await post("/api/wishlist", { productId: p._id, size });
      showToast("success", "Added to wishlist");
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (err) {
      if (err?.response?.status === 401) {
        showToast("danger", "Please login");
        navigate("/login");
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* PRODUCT IMAGE */}
        <div className="col-md-6 text-center">
          <img
            src={p.imageUrl}
            alt={p.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "520px", objectFit: "contain" }}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-6">
          <h3 className="fw-bold">{p.name}</h3>

          <div className="text-warning mb-2">
            {"★".repeat(Math.round(p.rating || 5))}
            <span className="text-muted small"> ({p.numReviews || 200})</span>
          </div>

          <h4 className="fw-bold">
            ₹{p.price}{" "}
            <span className="text-muted text-decoration-line-through fs-6">
              ₹{p.originalPrice}
            </span>
          </h4>
          <p className="text-success fw-semibold">50% off</p>

          {/* SIZE */}
          <div className="mb-2">
            <strong>Size:</strong>
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {(p.sizes || ["S", "M", "L", "XL"]).map((s) => (
                <button
                  key={s}
                  className={`btn btn-sm ${
                    size === s ? "btn-dark text-white" : "btn-outline-secondary"
                  }`}
                  style={{ minWidth: "48px", borderRadius: "6px" }}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="d-flex align-items-center my-3">
            <span className="me-2 fw-semibold">Quantity:</span>
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

          {/* ACTION BUTTONS */}
          <div className="d-flex gap-2 mb-4">
            <button className="btn btn-primary px-4" onClick={buyNow}>
              Buy Now
            </button>
            <button
              className="btn btn-outline-primary px-4"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button className="btn btn-light border" onClick={addToWish}>
              <i className="bi bi-heart"></i>
            </button>
          </div>

          {/* ICON BENEFITS */}
          <div className="d-flex gap-4 text-muted small mb-3 flex-wrap">
            <span>↩️ 10-day Return</span>
            <span>💳 COD</span>
            <span>🚚 Free Delivery</span>
            <span>🔒 Secure Payment</span>
          </div>

          <h6>Description:</h6>
          <p className="text-muted">{p.description}</p>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <h5 className="mt-5 mb-3 fw-bold">More items you may like</h5>
      <div className="row g-3">
        {(p.related || []).map((r) => (
          <div className="col-6 col-md-3" key={r._id}>
            <div className="card border-0 shadow-sm">
              <img src={r.imageUrl} className="card-img-top" alt={r.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
