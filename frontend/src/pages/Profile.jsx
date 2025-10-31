import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="text-center border rounded p-4 shadow-sm bg-white"
          style={{ maxWidth: "400px" }}
        >
          <h5 className="fw-semibold mb-2">Login Required</h5>
          <p className="text-muted mb-3">Please log in to view your account.</p>
          <Link to="/login" className="btn btn-primary w-100 btn-sm">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h4 className="fw-semibold mb-3">User Profile</h4>

      <div className="border rounded p-4 bg-white shadow-sm">
        <div className="mb-3">
          <p className="mb-1">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-0">
            <strong>Phone:</strong> {user.mobileNumber}
          </p>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Link to="/orders" className="btn btn-outline-secondary btn-sm">
            Order History
          </Link>
          <Link to="/checkout" className="btn btn-primary btn-sm">
            Add New Address
          </Link>
        </div>
      </div>
    </div>
  );
}
