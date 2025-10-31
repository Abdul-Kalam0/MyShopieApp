import { useEffect, useState } from "react";
import { get, post, del } from "../services/api";
import Loader from "../components/Loader.jsx";

export default function Wishlist({ showToast }) {
  const [data, setData] = useState(null);

  const load = async () => {
    const r = await get("/api/wishlist");
    setData(r.data || { products: [] });
  };

  useEffect(() => {
    load();
  }, []);

  if (!data) return <Loader />;

  // ✅ Store selected size for each wishlist product
  const updateSize = (pid, size) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p._id === pid ? { ...p, selectedSize: size } : p
      ),
    }));
  };

  const moveToCart = async (product) => {
    if (!product.selectedSize) {
      showToast("warning", "Please select a size before moving to cart");
      return;
    }

    await post("/api/cart", {
      productId: product._id,
      qty: 1,
      size: product.selectedSize,
    });

    await del("/api/wishlist", { productId: product._id });

    showToast("success", "Moved to Cart");
    load();
    window.dispatchEvent(new Event("cart-updated"));
  };

  const remove = async (pid) => {
    await del("/api/wishlist", { productId: pid });
    showToast("danger", "Removed from Wishlist");
    load();
  };

  return (
    <div className="container container-narrow my-4">
      <h5 className="mb-3">My Wishlist</h5>
      <div className="row g-3">
        {data.products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <div className="card h-100">
              <img
                className="card-img-top product-img"
                src={product.imageUrl}
                alt=""
              />
              <div className="card-body d-flex flex-column">
                <h6 className="mb-1">{product.name}</h6>
                <div className="mb-2">
                  <strong>₹{product.price}</strong>
                </div>

                {/* ✅ Size selection buttons */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Size:</label>
                  <div className="d-flex gap-2 flex-wrap">
                    {["S", "M", "L", "XL"].map((s) => (
                      <button
                        key={s}
                        className={`btn btn-sm ${
                          product.selectedSize === s
                            ? "btn-dark text-white"
                            : "btn-outline-secondary"
                        }`}
                        style={{ minWidth: "40px" }}
                        onClick={() => updateSize(product._id, s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => moveToCart(product)}
                  >
                    Move to Cart
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => remove(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
