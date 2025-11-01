import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container my-5 d-flex justify-content-center align-items-center vh-50">
        <div className="card shadow-lg border-0" style={{ maxWidth: "400px" }}>
          <div className="card-body text-center p-4">
            <div className="mb-3">
              <i className="bi bi-person-circle fs-1 text-muted"></i>{" "}
            </div>
            <h5 className="card-title fw-bold mb-3">Access Your Profile</h5>
            <p className="card-text text-muted mb-4">
              Please log in to view and manage your account details.
            </p>
            <Link to="/login" className="btn btn-primary w-100">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h4 className="card-title mb-0 fw-bold">
                <i className="bi bi-person-fill me-2"></i> Profile
              </h4>
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-person-circle text-primary me-3 fs-4"></i>
                    <div>
                      <small className="text-muted d-block">Full Name</small>
                      <strong className="fs-5">{user.name}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-envelope text-primary me-3 fs-4"></i>
                    <div>
                      <small className="text-muted d-block">
                        Email Address
                      </small>
                      <strong className="fs-5">{user.email}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-telephone text-primary me-3 fs-4"></i>
                    <div>
                      <small className="text-muted d-block">Phone Number</small>
                      <strong className="fs-5">{user.mobileNumber}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-geo-alt text-primary me-3 fs-4"></i>
                    <div>
                      <small className="text-muted d-block">Address</small>
                      <strong className="fs-5">
                        {user.address || "Not provided"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-light d-flex justify-content-end gap-2 p-3">
              <Link to="/orders" className="btn btn-outline-secondary">
                <i className="bi bi-clock-history me-1"></i> Order History
              </Link>
              <Link to="/checkout" className="btn btn-primary">
                <i className="bi bi-plus-circle me-1"></i> Add Address
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
