import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { get, post } from "../services/api";
import Loader from "../components/Loader.jsx";
import useToast from "../hooks/useToast";
import { Footer } from "../components/Footer.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { toast, show: showToast, hide } = useToast();

  useEffect(() => {
    get(`/api/products/${id}`)
      .then((r) => {
        const product = r.data?.product;
        setP(product);
        if (product?.category) {
          get(
            `/api/products?category=${encodeURIComponent(
              product.category
            )}&limit=6`
          )
            .then((res) => {
              const products = res.data?.products || [];
              setRelatedProducts(
                products.filter((prod) => prod._id !== product._id)
              );
            })
            .catch(() => setRelatedProducts([]));
        }
      })
      .catch(() => {});
  }, [id]);

  if (!p) return <Loader />;

  const addToCart = async () => {
    if (!size) {
      showToast("warning", "Please choose a size");
      return;
    }
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

  const addToWish = async () => {
    if (!size) {
      showToast("warning", "Select size first");
      return;
    }
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
    <div className="container my-5">
      {/* Back Button + Title */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <button
          className="btn p-0 border-0 bg-transparent"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </button>
        <h4 className="fw-bold m-0">Product Details</h4>
      </div>

      <div className="row g-4">
        {/* PRODUCT IMAGE */}
        <div className="col-md-6 text-center">
          <div className="card border-0 shadow-lg">
            <img
              src={p.imageUrl}
              alt={p.name}
              className="card-img-top img-fluid rounded"
              style={{ maxHeight: "520px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4">
            <h3 className="fw-bold text-dark mb-3">{p.name}</h3>

            <div className="text-warning mb-3 fs-5">
              {"★".repeat(Math.round(p.rating || 5))}
              <span className="text-muted small ms-2">
                ({p.numReviews || 200} reviews)
              </span>
            </div>

            <h4 className="fw-bold text-primary mb-2">
              ₹{p.price}{" "}
              <span className="text-muted text-decoration-line-through fs-6">
                ₹{p.originalPrice}
              </span>
            </h4>
            <p className="text-success fw-semibold mb-4">50% off</p>

            {/* SIZE */}
            <div className="mb-4">
              <strong className="text-dark">Size:</strong>
              <div className="d-flex gap-2 mt-3 flex-wrap">
                {(p.sizes || ["S", "M", "L", "XL"]).map((s) => (
                  <button
                    key={s}
                    className={`btn btn-sm border ${
                      size === s
                        ? "btn-dark text-white shadow"
                        : "btn-outline-secondary"
                    }`}
                    style={{ minWidth: "50px", borderRadius: "8px" }}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="d-flex align-items-center mb-4">
              <span className="me-3 fw-semibold text-dark">Quantity:</span>
              <div className="input-group" style={{ maxWidth: "150px" }}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  -
                </button>
                <input
                  className="form-control text-center fw-bold"
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
            <div className="d-flex gap-3 mb-4 flex-wrap">
              <button
                className="btn btn-outline-primary px-4 py-2 fw-semibold"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              {/* ✅ Wishlist button same size */}
              <button
                className="btn btn-outline-danger px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                onClick={addToWish}
              >
                <i className="bi bi-heart-fill"></i>
                Wishlist
              </button>
            </div>

            {/* BENEFITS */}
            <div className="d-flex gap-4 text-muted small mb-4 flex-wrap">
              <div className="d-flex align-items-center">
                <i className="bi bi-arrow-repeat me-2 text-success"></i>
                <span>10-day Return</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-credit-card me-2 text-primary"></i>
                <span>COD</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-truck me-2 text-info"></i>
                <span>Free Delivery</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-shield-check me-2 text-warning"></i>
                <span>Secure Payment</span>
              </div>
            </div>

            <h6 className="text-dark fw-bold">Description:</h6>
            <p className="text-muted">{p.description}</p>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-5">
        <h5 className="fw-bold text-dark mb-4">More items you may like</h5>
        {relatedProducts.length > 0 ? (
          <div className="row g-3">
            {relatedProducts.map((r) => (
              <div className="col-6 col-md-4 col-lg-3" key={r._id}>
                <div className="card border-0 shadow-sm h-100">
                  <Link to={`/product/${r._id}`}>
                    <img
                      src={r.imageUrl}
                      className="card-img-top img-fluid"
                      alt={r.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body text-center">
                    <Link
                      to={`/product/${r._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <h6 className="card-title fw-semibold">{r.name}</h6>
                    </Link>
                    <p className="text-primary fw-bold mb-2">₹{r.price}</p>
                    {r.originalPrice && (
                      <p className="text-muted text-decoration-line-through small">
                        ₹{r.originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">
            No similar products found in this category.
          </p>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor:
              toast.variant === "success"
                ? "green"
                : toast.variant === "danger"
                ? "red"
                : "orange",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 9999,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={hide}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
