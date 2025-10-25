import { useState, useCallback } from 'react'

export default function useToast() {
  const [toast, setToast] = useState(null)
  const show = useCallback((variant, message) => setToast({ variant, message, id: Date.now() }), [])
  const hide = useCallback(() => setToast(null), [])
  return { toast, show, hide }
}
