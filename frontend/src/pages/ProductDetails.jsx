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
    if (!size) return showToast("danger", "Please select a size first");

    try {
      await post("/api/cart", { productId: p._id, qty, size });
      showToast("primary", "Added to Cart");

      // 👉 MANUAL UPDATE for Navbar
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      if (err?.response?.status === 401) {
        showToast("danger", "Please login first");
        navigate("/login");
      }
    }
  };

  const addToWish = async () => {
    try {
      await post("/api/wishlist", { productId: p._id });
      showToast("secondary", "Added to Wishlist");
    } catch (err) {
      if (err?.response?.status === 401) {
        showToast("danger", "Please login first");
        navigate("/login");
      }
    }
  };

  return (
    <div className="container container-narrow my-4">
      <div className="row g-4">
        <div className="col-md-5">
          <img className="img-fluid rounded" src={p.imageUrl} alt={p.name} />
        </div>
        <div className="col-md-7">
          <h4>{p.name}</h4>
          <div className="mb-2">
            <strong>₹{p.price}</strong>{" "}
            <span className="text-muted text-decoration-line-through">
              ₹{p.originalPrice}
            </span>
          </div>
          <div className="text-warning mb-2">
            {"★".repeat(Math.round(p.rating || 0))}
            <span className="text-muted small"> ({p.numReviews || 0})</span>
          </div>
          <div className="mb-3">
            <label className="form-label me-2">Size:</label>
            {(p.sizes || ["S", "M", "L", "XL"]).map((s) => (
              <button
                key={s}
                className={`btn btn-sm me-2 ${
                  size === s ? "btn-dark" : "btn-outline-secondary"
                }`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="d-flex align-items-center mb-3">
            <span className="me-2">Quantity:</span>
            <div className="input-group" style={{ maxWidth: "140px" }}>
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
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={addToCart}>
              Add to Cart
            </button>
            <button className="btn btn-outline-secondary" onClick={addToWish}>
              <i className="bi bi-heart me-1"></i> Add to Wishlist
            </button>
          </div>
          <hr />
          <h6>Description:</h6>
          <p className="text-muted">{p.description}</p>
        </div>
      </div>

      <h6 className="mt-5 mb-3">More items you may like</h6>
      <div className="row g-3">
        {(p.related || []).map((r) => (
          <div className="col-6 col-md-3" key={r._id}>
            <div className="card">
              <img
                className="card-img-top product-img"
                src={r.imageUrl}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
