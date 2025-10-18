import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const categories = [
    {
      name: "Men",
      img: "https://images.unsplash.com/photo-1516822003754-cca485356ecb?w=500&q=80",
    },
    {
      name: "Women",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    },
    {
      name: "Kids",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    },
    {
      name: "Electronics",
      img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500&q=80",
    },
    {
      name: "Home",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    },
  ];

  return (
    <>
      <Header />
      <main className="container py-4">
        {/* 🔹 Category Section */}
        <div className="row justify-content-center text-center mb-4">
          {categories.map((cat, index) => (
            <div key={index} className="col-6 col-md-2 mb-4 mx-auto">
              <div className="card border-0 shadow-sm">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="card-img-top "
                  style={{
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "6px 6px 0 0",
                  }}
                />
                <div className="card-body py-2">
                  <h6 className="card-title fw-semibold mb-0">{cat.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Hero Section */}
        <div
          className="rounded d-flex align-items-center justify-content-center mb-5 text-white"
          style={{
            height: "350px",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-dark bg-opacity-50 rounded p-4 text-center">
            <h2 className="fw-bold mb-2">New Season</h2>
            <p className="mb-0">
              Discover the latest trends in fashion & lifestyle
            </p>
          </div>
        </div>

        {/* 🔹 New Arrival Section */}
        <div className="row g-4">
          {[1, 2].map((_, i) => (
            <div key={i} className="col-md-6">
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
                    src={
                      i === 0
                        ? "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80"
                        : "https://images.unsplash.com/photo-1521334884684-d80222895322?w=300&q=80"
                    }
                    alt="collection"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <small className="text-uppercase text-muted">
                    New Arrivals
                  </small>
                  <h5 className="fw-bold mt-2 mb-2">Summer Collection</h5>
                  <p className="text-muted mb-0">
                    Check out our best winter collection to stay warm in style
                    this season.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
