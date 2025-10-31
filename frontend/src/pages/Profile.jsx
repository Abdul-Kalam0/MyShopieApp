import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth to access user data

export default function Profile() {
  const { user } = useAuth(); // Get the logged-in user from AuthContext

  if (!user) {
    return (
      <div className="container container-narrow my-4">
        <h5>User Profile</h5>
        <div className="card p-3">
          <p className="text-muted">Please log in to view your profile.</p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container container-narrow my-4">
      <h5>User Profile</h5>
      <div className="card p-3">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              <strong>Name:</strong> {user.name}
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="mb-2">
              <strong>Phone:</strong> {user.mobileNumber}
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/orders" className="btn btn-outline-secondary me-2">
              Order History
            </Link>
            <Link to="/checkout" className="btn btn-primary">
              Add New Address
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
