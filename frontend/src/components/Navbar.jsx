import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, post } from "../services/api";

export default function Navbar({ onSearch }) {
  const [q, setQ] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ function to fetch counts manually when triggered
  const fetchCounts = () => {
    get("/api/cart").then((res) => setCartCount(res.data?.items?.length || 0));
    get("/api/wishlist").then((res) =>
      setWishCount(res.data?.products?.length || 0)
    );
  };

  useEffect(() => {
    // Check login + initial counts on load & page change
    get("/api/users/me")
      .then((res) => setUser(res.user))
      .catch(() => setUser(null));
    fetchCounts();

    // ✅ Listen for "cart-updated" event and refresh count
    window.addEventListener("cart-updated", fetchCounts);

    return () => {
      window.removeEventListener("cart-updated", fetchCounts);
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    await post("/api/users/logout");
    setUser(null);
    navigate("/", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(q);
    navigate(`/products?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar navbar-light bg-white sticky-header shadow-sm">
      <div className="container container-narrow d-flex align-items-center justify-content-between py-2">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          MyShoppingSite
        </Link>

        <form
          className="d-none d-md-flex flex-fill mx-4"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control"
            type="search"
            placeholder="Search for products"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>

        <div className="d-flex align-items-center gap-3">
          {!user ? (
            <>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="fw-semibold">Hi, {user.name}</span>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          <NavLink to="/wishlist" className="btn btn-light position-relative">
            <i className="bi bi-heart fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {wishCount}
            </span>
          </NavLink>

          <NavLink to="/cart" className="btn btn-light position-relative">
            <i className="bi bi-cart fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
