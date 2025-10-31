import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onSearch }) {
  const [q, setQ] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { user, cartCount, wishCount, logout, refreshCounts } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    refreshCounts();
    setShowMenu(false);
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

        {/* Search bar desktop */}
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

        {/* Desktop buttons */}
        <div className="d-none d-md-flex align-items-center gap-3">
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
              <NavLink
                to="/profile"
                className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                style={{
                  width: "34px",
                  height: "34px",
                  fontSize: "16px",
                  fontWeight: "600",
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
            <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
              {wishCount}
            </span>
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className="btn btn-light position-relative">
            <i className="bi bi-cart fs-5"></i>
            <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
              {cartCount}
            </span>
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="btn d-md-none"
          onClick={() => setShowMenu(!showMenu)}
        >
          <i className="bi bi-list fs-2"></i>
        </button>
      </div>

      {/* Mobile dropdown */}
      {showMenu && (
        <div className="bg-white shadow-sm border-top py-3 px-3 d-md-none">
          {/* Mobile search */}
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              type="search"
              placeholder="Search for products"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>

          {!user ? (
            <>
              <button
                className="btn btn-outline-primary w-100 mb-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              {/* ✅ Mobile Profile Avatar — Click works */}
              <div
                className="d-flex align-items-center mb-3"
                role="button"
                onClick={() => navigate("/profile")}
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                  style={{
                    width: "38px",
                    height: "38px",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="ms-2 fw-semibold">{user.name}</span>
              </div>

              <button className="btn btn-danger w-100 mb-3" onClick={logout}>
                Logout
              </button>
            </>
          )}

          {/* Mobile Wishlist / Cart */}
          <div className="d-flex justify-content-between">
            <NavLink
              to="/wishlist"
              className="btn btn-light position-relative w-50 me-2"
            >
              <i className="bi bi-heart fs-5"></i>
              <span className="badge bg-danger ms-1">{wishCount}</span>
            </NavLink>

            <NavLink
              to="/cart"
              className="btn btn-light position-relative w-50"
            >
              <i className="bi bi-cart fs-5"></i>
              <span className="badge bg-danger ms-1">{cartCount}</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
