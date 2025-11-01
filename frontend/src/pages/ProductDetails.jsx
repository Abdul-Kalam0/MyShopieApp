import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import { get, post } from "../services/api";
import Loader from "../components/Loader.jsx";

export default function ProductDetails({ showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]); // New state for related products

  useEffect(() => {
    // Fetch main product
    get(`/api/products/${id}`)
      .then((r) => {
        const product = r.data?.product;
        setP(product);
        // Fetch related products from the same category
        if (product?.category) {
          get(
            `/api/products?category=${encodeURIComponent(
              product.category
            )}&limit=6`
          ) // Limit to 6 for brevity; adjust as needed
            .then((res) => {
              const products = res.data?.products || [];
              // Exclude the current product from related
              setRelatedProducts(
                products.filter((prod) => prod._id !== product._id)
              );
            })
            .catch(() => setRelatedProducts([])); // Fallback on error
        }
      })
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
    <div className="container my-5">
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
                    style={{
                      minWidth: "50px",
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setSize(s)}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
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
                className="btn btn-primary px-4 py-2 fw-semibold shadow"
                onClick={buyNow}
                style={{ transition: "all 0.2s ease" }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                Buy Now
              </button>
              <button
                className="btn btn-outline-primary px-4 py-2 fw-semibold"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-light border px-3 py-2"
                onClick={addToWish}
                title="Add to Wishlist"
              >
                <i className="bi bi-heart text-danger fs-5"></i>
              </button>
            </div>

            {/* ICON BENEFITS */}
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

      {/* RELATED PRODUCTS (Same Category) */}
      <div className="mt-5">
        <h5 className="fw-bold text-dark mb-4">More items you may like</h5>
        {relatedProducts.length > 0 ? (
          <div className="row g-3">
            {relatedProducts.map((r) => (
              <div className="col-6 col-md-4 col-lg-3" key={r._id}>
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <Link
                    to={`/product/${r._id}`}
                    className="text-decoration-none"
                  >
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
    </div>
  );
}
