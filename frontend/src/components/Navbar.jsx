import { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  const toggleModal = () => setShowModal(!showModal);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      {/* 🔹 Navbar Section */}
      <nav className="navbar bg-light shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Left: Logo */}
          <h4 className="fw-bold text-secondary m-0">MyShopie</h4>

          {/* Center: Search bar */}
          <form className="d-flex w-50 mx-3" role="search">
            <input
              className="form-control rounded-pill px-3"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          {/* Right: Buttons */}
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-secondary px-4" onClick={toggleModal}>
              Login
            </button>

            {/* Wishlist */}
            <div className="position-relative">
              <FaHeart size={22} color="gray" />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "10px" }}
              >
                0
              </span>
            </div>

            {/* Cart */}
            <div className="position-relative d-flex align-items-center">
              <FaShoppingCart size={22} color="gray" />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "10px" }}
              >
                0
              </span>
              <span className="ms-2 text-secondary">Cart</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 Modal Section */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">
                  {isLogin ? "Login to MyShopie" : "Create an Account"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                ></button>
              </div>

              <div className="modal-body">
                {isLogin ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                      />
                    </div>
                    <button className="btn btn-secondary w-100 mb-2">
                      Login
                    </button>
                    <p className="text-center small">
                      Don’t have an account?{" "}
                      <button className="btn btn-link p-0" onClick={toggleForm}>
                        Sign up
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                      />
                    </div>
                    <button className="btn btn-secondary w-100 mb-2">
                      Sign Up
                    </button>
                    <p className="text-center small">
                      Already have an account?{" "}
                      <button className="btn btn-link p-0" onClick={toggleForm}>
                        Login
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
