import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onSearch }) {
  const [q, setQ] = useState("");
  const { user, cartCount, wishCount, logout, refreshCounts } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    refreshCounts();
  }, [location.pathname, refreshCounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(q);
    navigate(`/products?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar navbar-light bg-white sticky-header shadow-sm">
      <div className="container container-narrow d-flex align-items-center justify-content-between py-2">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold fs-4">
          MyShoppingSite
        </Link>

        {/* Search */}
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

        {/* Right Side Buttons */}
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
              {/* ✅ Circular Profile Avatar */}
              <NavLink
                to="/profile"
                className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                style={{
                  width: "34px",
                  height: "34px",
                  fontSize: "16px",
                  fontWeight: "600",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                title={user.name}
              >
                {user.name?.charAt(0).toUpperCase()}
              </NavLink>

              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          )}

          {/* Wishlist */}
          <NavLink to="/wishlist" className="btn btn-light position-relative">
            <i className="bi bi-heart fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {wishCount}
            </span>
          </NavLink>

          {/* Cart */}
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
