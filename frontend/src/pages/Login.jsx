import { useState } from "react";
import { post } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ showToast }) {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!mobileNumber || !password) {
      return showToast("danger", "All fields are required");
    }
    try {
      setLoading(true);
      const res = await post("/api/users/login", { mobileNumber, password });

      // ✅ Save token + user in localStorage
      localStorage.setItem("token", res?.data?.token); // assuming backend sends token properly
      localStorage.setItem("user", JSON.stringify(res?.data?.data));

      showToast("success", "Login Successful!");
      navigate("/"); // ✅ redirect to Home
    } catch (err) {
      showToast("danger", err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "80px" }}>
      <h3 className="text-center mb-4">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button disabled={loading} className="btn btn-primary w-100">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
