import { useState } from "react";
import { post } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ showToast }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, mobileNumber, password } = form;
    if (!name || !email || !mobileNumber || !password) {
      return showToast("danger", "All fields are required");
    }
    try {
      setLoading(true);
      const res = await post("/api/users/registration", form);
      showToast("success", "Registration Successful!");
      navigate("/login"); // ✅ After register → go to login
    } catch (err) {
      showToast(
        "danger",
        err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "80px" }}>
      <h3 className="text-center mb-4">Create Account</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-control mb-3"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          className="form-control mb-3"
          value={form.mobileNumber}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address (optional)"
          className="form-control mb-3"
          rows="2"
          value={form.address}
          onChange={handleChange}
        />
        <button disabled={loading} className="btn btn-primary w-100">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
