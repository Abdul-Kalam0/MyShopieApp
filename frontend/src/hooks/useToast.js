import { useState, useCallback } from "react";

export default function useToast() {
  const [toast, setToast] = useState(null);

  const show = useCallback((variant, message) => {
    const id = Date.now();
    setToast({ variant, message, id });

    // ✅ Auto hide after 3 seconds
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3000);
  }, []);

  const hide = useCallback(() => setToast(null), []);

  return { toast, show, hide };
}
