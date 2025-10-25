import { useEffect, useState } from "react";
import { get } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CategoryStrip() {
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    get("/api/categories")
      .then((r) => setCats(r.data?.categories || []))
      .catch(() => {});
  }, []);

  // Fallback real image mapping per category name
  const categoryImages = {
    Men: "https://images.unsplash.com/photo-1520975918319-5355c1ba05e0",
    "T-Shirts": "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
    Hoodies: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    Jeans: "https://images.unsplash.com/photo-1514996937319-344454492b37",
    Jackets: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
  };

  return (
    <div className="container container-narrow mt-4">
      <div className="row g-3 justify-content-center">
        {cats.map((c) => (
          <div className="col-6 col-md-2" key={c._id}>
            <div
              role="button"
              className="position-relative overflow-hidden rounded"
              style={{
                height: "110px",
                backgroundImage: `url(${
                  categoryImages[c.name] || categoryImages["Men"]
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() =>
                navigate(`/products?category=${encodeURIComponent(c.name)}`)
              }
            >
              <div
                className="position-absolute bottom-0 start-0 w-100 text-center text-white fw-semibold"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  padding: "6px 0",
                  fontSize: ".9rem",
                }}
              >
                {c.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
