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
      {/* ✅ Full width navbar container */}
      <div className="d-flex align-items-center justify-content-between py-2 px-3 w-100">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold fs-4">
          Shopie — Fashion Store
        </Link>

        {/* Desktop search */}
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

        {/* Desktop actions */}
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
                }}
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

        {/* Mobile menu toggle */}
        <button
          className="btn d-md-none"
          onClick={() => setShowMenu(!showMenu)}
        >
          <i className="bi bi-list fs-2"></i>
        </button>
      </div>

      {/* ✅ Mobile full-width dropdown */}
      {showMenu && (
        <div className="bg-white w-100 shadow-sm border-top py-3 px-3 d-md-none">
          {/* ✅ Full width search */}
          <form className="w-100" onSubmit={handleSubmit}>
            <input
              className="form-control mb-3 w-100"
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
              {/* ✅ All in single line: Profile, Logout, Wishlist, Cart as circular elements */}
              <div className="d-flex justify-content-around align-items-center w-100 mb-3">
                {/* Profile */}
                <NavLink
                  to="/profile"
                  className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white position-relative"
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "18px",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                  title={user.name}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </NavLink>

                {/* Logout */}
                <button
                  className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "18px",
                  }}
                  onClick={logout}
                  title="Logout"
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>

                {/* Wishlist */}
                <NavLink
                  to="/wishlist"
                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-relative"
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "18px",
                  }}
                  title="Wishlist"
                >
                  <i className="bi bi-heart"></i>
                  <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {wishCount}
                  </span>
                </NavLink>

                {/* Cart */}
                <NavLink
                  to="/cart"
                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-relative"
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "18px",
                  }}
                  title="Cart"
                >
                  <i className="bi bi-cart"></i>
                  <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                </NavLink>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
