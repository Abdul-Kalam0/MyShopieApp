import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="text-center">
          <h4 className="mb-2">You are not logged in</h4>
          <p className="text-muted mb-3">
            Login to access your profile & orders.
          </p>
          <Link to="/login" className="btn btn-primary px-4">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "700px", marginTop: "60px" }}>
      <h4 className="mb-4 fw-bold">My Account</h4>

      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
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
            <h5 className="mb-0">{user.name}</h5>
            <small className="text-muted">Customer Account</small>
          </div>
        </div>

        <div className="p-3 rounded bg-light mb-4">
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

        <div className="d-flex justify-content-end gap-2">
          <Link to="/orders" className="btn btn-outline-dark">
            View Orders
          </Link>
          <Link to="/checkout" className="btn btn-primary">
            Add Address
          </Link>
        </div>
      </div>
    </div>
  );
}
