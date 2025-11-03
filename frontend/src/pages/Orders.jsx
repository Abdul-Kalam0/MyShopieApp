import { useEffect, useState } from "react";
import { get } from "../services/api";
import Loader from "../components/Loader.jsx";
import { Footer } from "../components/Footer.jsx";

export default function Orders() {
  const [orders, setOrders] = useState(null);

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
      <h5 className="fw-bold mb-3">Order History</h5>

      {orders.map((o) => (
        <div className="card p-3 mb-3 shadow-sm border-0 rounded-3" key={o._id}>
          {/* Order Header */}
          <div className="d-flex flex-column mb-2">
            <div className="fw-semibold">
              Order ID: <span className="text-primary">#{o._id.slice(-8)}</span>
            </div>

            <small className="text-muted">
              {new Date(o.createdAt).toLocaleString()}
            </small>
          </div>

          {/* Status */}
          <span
            className={`${getStatusBadge(o.status)} mb-2`}
            style={{ width: "fit-content" }}
          >
            {o.status} / {o.paymentStatus}
          </span>

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
