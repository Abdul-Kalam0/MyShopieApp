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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    get("/api/categories").then((r) =>
      setCategories(r.data?.categories?.map((c) => c.name) || [])
    );
  }, []);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    const q = new URLSearchParams();
    const qp = { ...Object.fromEntries(qs.entries()), ...params };

    if (qp.q) q.set("q", qp.q);
    if (qp.sort) q.set("sort", qp.sort);

    // Handle category: Send as array if multiple, or single string
    if (qp.category && Array.isArray(qp.category) && qp.category.length > 0) {
      qp.category.forEach((cat) => q.append("category", cat)); // Append each for backend array handling
    } else if (qp.category && typeof qp.category === "string") {
      q.set("category", qp.category);
    }

    if (qp.minRating) q.set("minRating", qp.minRating);
    if (qp.maxPrice) q.set("maxPrice", qp.maxPrice);

    try {
      const res = await get("/api/products?" + q.toString());
      setData(res.data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]); // Fallback to empty on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Build initial filters from URL
    const initialFilters = {
      q: qs.get("q") || "",
      category: qs.get("category") ? [qs.get("category")] : [], // Default to empty array if none
    };
    setFilters(initialFilters);

    // Fetch products with initial params (or none for all products)
    fetchProducts(initialFilters);
  }, [qs]); // Only depend on qs to avoid infinite loops

  const onClear = () => {
    const base = { categoriesList: categories };
    setFilters(base);
    fetchProducts({}); // Clear all filters
  };

  useEffect(() => {
    setFilters((f) => ({ ...f, categoriesList: categories }));
  }, [categories]);

  const onChangeFilters = (f) => {
    setFilters(f);
    fetchProducts(f);
  };

  return (
    <div className="container container-narrow my-3">
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card p-3">
            <FiltersSidebar
              applied={filters}
              onChange={onChangeFilters}
              onClear={onClear}
            />
          </div>
        </div>

        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">
              Showing All Products{" "}
              <span className="text-muted">({data.length} products)</span>
            </h6>
          </div>

          {loading ? (
            <Loader />
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
      <Footer />
    </div>
  );
}
