import { useEffect, useState } from "react";
import { get } from "../services/api";
import Loader from "../components/Loader.jsx";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    get("/api/orders").then((r) => setOrders(r.data || []));
  }, []);
  if (!orders) return <Loader />;
  return (
    <div className="container container-narrow my-4">
      <h5>Order History</h5>
      {orders.map((o) => (
        <div className="card p-3 mb-3" key={o._id}>
          <div className="d-flex justify-content-between">
            <div>
              <strong>#{o._id.slice(-8)}</strong> •{" "}
              {new Date(o.createdAt).toLocaleString()}
            </div>
            <div className="text-muted">
              {o.status} / {o.paymentStatus}
            </div>
          </div>
          <ul className="mt-2 mb-0">
            {o.items.map((it, idx) => (
              <li key={idx}>
                {it.qty} × {it.product?.name} — ₹{it.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!orders.length && <div className="text-muted">No orders yet.</div>}
    </div>
  );
}
