import { useEffect, useState } from "react";
import { get } from "../services/api";
import Loader from "../components/Loader.jsx";
import { Footer } from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom"; // Added for back navigation

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate(); // Added for back navigation

  useEffect(() => {
    get("/api/orders").then((r) => setOrders(r.data || []));
  }, []);

  if (!orders) return <Loader />;

  // Badge styling for status
  const getStatusBadge = (status) => {
    if (status === "Delivered") return "badge bg-success";
    if (status === "Cancelled") return "badge bg-danger";
    return "badge bg-primary";
  };

  return (
    <div className="container container-narrow my-4">
      {/* Modified: Back button and Order History title in same row */}
      <div className="d-flex align-items-center mb-3">
        <button
          className="btn btn-link p-0 me-2"
          onClick={() => navigate(-1)}
          title="Go Back"
        >
          <i className="bi bi-arrow-left fs-4"></i>
        </button>
        <h5 className="fw-bold mb-0">Order History</h5>
      </div>

      {orders.map((o) => (
        <div className="card p-3 mb-3 shadow-sm border-0 rounded-3" key={o._id}>
          {/* Order Header */}
          <div className="mb-2">
            {/* Desktop: Order ID, Date, and Status in separate rows */}
            <div className="d-none d-md-block">
              <div className="d-flex flex-column mb-2">
                <div className="fw-semibold">
                  Order ID:{" "}
                  <span className="text-primary">#{o._id.slice(-8)}</span>
                </div>
                <small className="text-muted">
                  {new Date(o.createdAt).toLocaleString()}
                </small>
              </div>
              <span
                className={`${getStatusBadge(o.status)} mb-2`}
                style={{ width: "fit-content" }}
              >
                {o.status}
              </span>
            </div>

            {/* Mobile: Order ID and Status in same row (Status at right), Date below */}
            <div className="d-md-none">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="fw-semibold">
                  Order ID:{" "}
                  <span className="text-primary">#{o._id.slice(-8)}</span>
                </div>
                <span
                  className={`${getStatusBadge(o.status)}`}
                  style={{ width: "fit-content" }}
                >
                  {o.status}
                </span>
              </div>
              <small className="text-muted">
                {new Date(o.createdAt).toLocaleString()}
              </small>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-2">
            {o.items.map((it, idx) => (
              <div key={idx} className="d-flex justify-content-between mb-1">
                <span className="text-muted small">
                  {it.qty} × {it.product?.name}
                </span>
                <strong>₹{it.price * it.qty}</strong>
              </div>
            ))}
          </div>

          <hr />

          {/* Total */}
          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>₹{o.items.reduce((t, i) => t + i.price * i.qty, 0)}</span>
          </div>
        </div>
      ))}

      {!orders.length && (
        <div className="text-center text-muted mt-4">No orders yet.</div>
      )}

      <Footer />
    </div>
  );
}
