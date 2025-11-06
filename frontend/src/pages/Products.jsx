import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { get } from "../services/api";
import ProductCard from "../components/ProductCard.jsx";
import FiltersSidebar from "../components/FiltersSidebar.jsx";
import Loader from "../components/Loader.jsx";
import { Footer } from "../components/Footer.jsx";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Products({ showToast }) {
  const qs = useQuery();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  /**
   * ✅ Fetch products with filters (category, gender, price, rating, sort)
   */
  const fetchProducts = async (params = {}) => {
    setLoading(true);

    const q = new URLSearchParams();
    const qp = { ...Object.fromEntries(qs.entries()), ...params };

    // ✅ Search keyword
    if (qp.q) q.set("q", qp.q);

    // ✅ Sort order
    if (qp.sort) q.set("sort", qp.sort);

    // ✅ Category from URL (like Shirts, Jeans, Jackets)
    const categoryFromUrl = qs.get("category");
    if (categoryFromUrl) q.set("category", categoryFromUrl);

    // ✅ Gender filter
    if (qp.gender) q.set("gender", qp.gender);

    // ✅ Price filters
    if (qp.minPrice) q.set("minPrice", qp.minPrice);
    if (qp.maxPrice) q.set("maxPrice", qp.maxPrice);

    // ✅ Rating filter
    if (qp.minRating) q.set("minRating", qp.minRating);

    // 🧠 Debug log
    console.log("🔍 API Query →", q.toString());

    // ✅ Fetch products
    const res = await get("/api/products?" + q.toString());
    setData(res.data?.products || []);
    setLoading(false);
  };

  /**
   * ✅ Initial fetch when component loads or URL query changes
   */
  useEffect(() => {
    const categoryFromUrl = qs.get("category");
    const querySearch = qs.get("q");

    setFilters((prev) => ({
      ...prev,
      q: querySearch || "",
      category: categoryFromUrl || "",
    }));

    fetchProducts({
      q: querySearch || "",
      category: categoryFromUrl || undefined,
    });
  }, [qs]);

  /**
   * ✅ Clear all filters (but keep category from URL)
   */
  const onClear = () => {
    const categoryFromUrl = qs.get("category");
    const base = { category: categoryFromUrl || undefined };
    setFilters(base);
    fetchProducts(base);
  };

  /**
   * ✅ When any filter changes (gender, price, rating, sort)
   */
  const onChangeFilters = (f) => {
    setFilters(f);
    fetchProducts(f);
  };

  return (
    <div className="container container-narrow my-3">
      <div className="row g-3">
        {/* Sidebar Filters */}
        <div className="col-md-3">
          <div className="card p-3">
            <FiltersSidebar
              applied={filters}
              onChange={onChangeFilters}
              onClear={onClear}
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">
              Showing Products{" "}
              <span className="text-muted">({data.length} items)</span>
            </h6>
          </div>

          {loading ? (
            <Loader />
          ) : data.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-muted">No products found 🛍️</h5>
            </div>
          ) : (
            <div className="row g-3">
              {data.map((p) => (
                <div className="col-6 col-md-4 col-lg-3" key={p._id}>
                  <ProductCard
                    p={p}
                    showToast={showToast}
                    onAddedCart={() => showToast("primary", "Added to Cart")}
                    onAddedWishlist={() =>
                      showToast("secondary", "Added to Wishlist")
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
