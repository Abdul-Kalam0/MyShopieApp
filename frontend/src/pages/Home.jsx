// src/pages/Home.jsx

import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";

export default function Home() {
  const navigate = useNavigate();

  // STATIC 5 CATEGORY TILES (with varied hover or implied text via images)
  const categories = [
    {
      name: "Shirts",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=988",
    },
    {
      name: "T-Shirts",
      image:
        "https://plus.unsplash.com/premium_photo-1688497831040-753ea826d174?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1432",
    },
    {
      name: "Hoodies",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    },
    {
      name: "Jeans",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    },
    {
      name: "Jackets",
      image:
        "https://images.unsplash.com/photo-1649433911119-7cf48b3e8f50?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071",
    },
  ];

  return (
    <div className="container">
      {/* --- CATEGORY IMAGE TILES --- */}
      <div className="container-narrow mt-4">
        <div className="row g-3 justify-content-center text-center">
          {categories.map((cat, index) => (
            <div className="col-6 col-md-2 mx-auto" key={index}>
              <div
                role="button"
                className="position-relative overflow-hidden rounded shadow-sm"
                style={{
                  height: "110px",
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() =>
                  navigate(`/products?category=${encodeURIComponent(cat.name)}`)
                }
              >
                <div
                  className="position-absolute bottom-0 start-0 w-100 text-white fw-semibold"
                  style={{
                    background: "rgba(0,0,0,0.55)",
                    padding: "5px 0",
                    fontSize: ".9rem",
                  }}
                >
                  {cat.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- HERO BANNER --- */}
      <div
        className="rounded d-flex align-items-center justify-content-center mb-5 text-white mt-4"
        style={{
          height: "350px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-dark bg-opacity-50 rounded p-4 text-center">
          <h2 className="fw-bold mb-2">Fresh Arrivals Await</h2>
          <p className="mb-0">
            Explore cutting-edge styles and timeless essentials for every
            occasion.
          </p>
        </div>
      </div>

      {/* --- FEATURE / PROMO SECTIONS --- */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-3 d-flex flex-row align-items-center bg-light">
            <div
              className="rounded me-3"
              style={{
                width: "120px",
                height: "120px",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80"
                alt="collection"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <small className="text-uppercase text-muted">
                Exclusive Drops
              </small>
              <h5 className="fw-bold mt-2 mb-2">Winter Essentials</h5>
              <p className="text-muted mb-0">
                Gear up with premium jackets and cozy layers designed for
                ultimate comfort and style.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-3 d-flex flex-row align-items-center bg-light">
            <div
              className="rounded me-3"
              style={{
                width: "120px",
                height: "120px",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1521334884684-d80222895322?w=300&q=80"
                alt="collection"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <small className="text-uppercase text-muted">Trending Now</small>
              <h5 className="fw-bold mt-2 mb-2">Urban Streetwear</h5>
              <p className="text-muted mb-0">
                Elevate your look with bold patterns and versatile pieces
                perfect for city adventures.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
