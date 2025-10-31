import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container py-5 d-flex justify-content-center">
        <div
          className="card p-4 shadow-sm text-center"
          style={{ maxWidth: "400px" }}
        >
          <h4 className="fw-bold mb-2">Login Required</h4>
          <p className="text-muted mb-3">Please login to view your profile.</p>
          <Link to="/login" className="btn btn-primary w-100">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card shadow-sm p-4 rounded"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        {/* Avatar + Name */}
        <div className="d-flex align-items-center mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{
              width: "70px",
              height: "70px",
              fontSize: "28px",
              fontWeight: "600",
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="ms-3">
            <h4 className="fw-bold mb-0">{user.name}</h4>
            <small className="text-muted">Welcome back 👋</small>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-light p-3 rounded border mb-4">
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-0">
            <strong>Phone:</strong> {user.mobileNumber}
          </p>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Link to="/orders" className="btn btn-outline-secondary">
            Order History
          </Link>
          <Link to="/checkout" className="btn btn-primary">
            Add Address
          </Link>
        </div>
      </div>
    </div>
  );
}
