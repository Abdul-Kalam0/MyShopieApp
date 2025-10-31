import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { get, post } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshCounts = useCallback(async () => {
    try {
      const c = await get("/api/cart");
      setCartCount(c.data?.items?.length || 0);
      const w = await get("/api/wishlist");
      setWishCount(w.data?.products?.length || 0);
    } catch {
      setCartCount(0);
      setWishCount(0);
    }
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const me = await get("/api/users/me");
      setUser(me.user || null);
    } catch {
      setUser(null);
    }
  }, []);

  // init: if token exists, fetch user + counts
  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => {
      if (token) {
        await fetchMe();
        await refreshCounts();
      }
      setLoading(false);
    })();
  }, [fetchMe, refreshCounts]);

  // listen to manual events from pages to refresh counts
  useEffect(() => {
    const h = () => refreshCounts();
    window.addEventListener("cart-updated", h);
    window.addEventListener("wishlist-updated", h);
    return () => {
      window.removeEventListener("cart-updated", h);
      window.removeEventListener("wishlist-updated", h);
    };
  }, [refreshCounts]);

  const login = async ({ mobileNumber, password }) => {
    const res = await post("/api/users/login", { mobileNumber, password });
    if (res?.token) localStorage.setItem("token", res.token);
    if (res?.data) localStorage.setItem("user", JSON.stringify(res.data));
    await fetchMe();
    await refreshCounts();
    return res;
  };

  const logout = async () => {
    try {
      await post("/api/users/logout");
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    setWishCount(0);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cartCount,
        wishCount,
        login,
        logout,
        refreshCounts,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
