import { useEffect, useState } from "react";
import { get, post, put, del } from "../services/api";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";

export default function Checkout({ showToast }) {
  const [addresses, setAddresses] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [editing, setEditing] = useState(null);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    const a = await get("/api/addresses");
    setAddresses(a.data || []);
    const c = await get("/api/cart");
    setCart(c.data || { items: [] });
  };

  useEffect(() => {
    load();
  }, []);

  if (!addresses || !cart) return <Loader />;

  const requiredFields = [
    "name",
    "city",
    "state",
    "zip",
    "phone",
    "line1",
    "line2",
  ];

  const addAddress = async () => {
    for (let field of requiredFields) {
      if (!form[field].trim()) {
        showToast("danger", `${field.toUpperCase()} is required`);
        return;
      }
    }

    if (!/^\d{10}$/.test(form.phone)) {
      showToast("danger", "Phone number must be 10 digits");
      return;
    }

    if (editing) {
      await put(`/api/addresses/${editing}`, form);
      showToast("success", "Address Updated");
      setEditing(null);
    } else {
      await post("/api/addresses", { ...form });
      showToast("success", "Address Added");
    }

    setForm({
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
    load();
  };

  const editAddress = (addr) => {
    setForm(addr);
    setEditing(addr._id);
  };

  const deleteAddress = async (id) => {
    await del(`/api/addresses/${id}`);
    showToast("danger", "Address Deleted");
    load();
  };

  const placeOrder = async () => {
    if (!selected) {
      showToast("danger", "Please select an address");
      return;
    }
    await post("/api/orders", { addressId: selected });
    showToast("success", "Order Placed Successfully.");
    navigate("/orders");
  };

  return (
    <div className="container container-narrow my-4">
      {/* ✅ Header with Back button */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <button
          className="btn p-0 border-0 bg-transparent"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </button>
        <h4 className="fw-bold m-0">Checkout</h4>
      </div>

      <div className="row g-4">
        {/* ✅ Address Section */}
        <div className="col-lg-8">
          <h6 className="fw-bold">Choose Address</h6>

          {(addresses || []).map((a) => (
            <div className="form-check card p-3 mb-2" key={a._id}>
              <input
                className="form-check-input"
                type="radio"
                name="addr"
                id={a._id}
                checked={selected === a._id}
                onChange={() => setSelected(a._id)}
              />

              <label className="form-check-label" htmlFor={a._id}>
                <div>
                  <strong>{a.name}</strong> — {a.line1}, {a.city}, {a.state}{" "}
                  {a.zip} • {a.phone}
                </div>

                <div className="mt-2">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => editAddress(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteAddress(a._id)}
                  >
                    Delete
                  </button>
                </div>
              </label>
            </div>
          ))}

          {/* ✅ Add / Edit Address Form */}
          <div className="card p-3 mt-3">
            <h6 className="fw-bold">
              {editing ? "Edit Address" : "Add New Address"}
            </h6>

            <div className="row g-2">
              {Object.keys(form).map((k) => (
                <div className="col-md-6" key={k}>
                  <input
                    className="form-control"
                    placeholder={k}
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  />
                </div>
              ))}
            </div>

            <button
              className="btn btn-outline-primary mt-2"
              onClick={addAddress}
            >
              {editing ? "Update" : "Save"} Address
            </button>

            {editing && (
              <button
                className="btn btn-outline-secondary mt-2 ms-2"
                onClick={() => {
                  setEditing(null);
                  setForm({
                    name: "",
                    line1: "",
                    line2: "",
                    city: "",
                    state: "",
                    zip: "",
                    phone: "",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* ✅ Order Summary */}
        <div className="col-lg-4">
          <div className="card p-3">
            <h6 className="fw-bold">Order Summary</h6>

            <div className="small text-muted mb-2">
              {cart.items.length > 0 ? (
                <ul className="ps-3 mb-2">
                  {cart.items.map((item) => (
                    <li key={item.product._id}>
                      {item.qty} × {item.product.name}
                    </li>
                  ))}
                </ul>
              ) : (
                "No items"
              )}
            </div>

            <button className="btn btn-primary w-100" onClick={placeOrder}>
              Checkout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
