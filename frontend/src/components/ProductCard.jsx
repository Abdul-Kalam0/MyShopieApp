import { Link } from 'react-router-dom'
import { post } from '../services/api'
import { useState } from 'react'

export default function ProductCard({ p, onAddedCart, onAddedWishlist }){
  const [busy, setBusy] = useState(false)
  const addCart = async () => {
    try{ setBusy(true); await post('/api/cart', { productId: p._id, qty: 1 }); onAddedCart?.(p) } finally { setBusy(false) }
  }
  const addWish = async () => {
    try{ setBusy(true); await post('/api/wishlist', { productId: p._id }); onAddedWishlist?.(p) } finally { setBusy(false) }
  }
  return (
    <div className="card h-100 card-hover position-relative">
      {p.discountPercent ? <span className="badge text-bg-danger badge-discount">{p.discountPercent}% off</span> : null}
      <Link className="text-decoration-none text-dark" to={`/product/${p._id}`}>
        <img className="card-img-top product-img" src={p.imageUrl} alt={p.name}/>
      </Link>
      <div className="card-body d-flex flex-column">
        <Link className="text-decoration-none text-dark" to={`/product/${p._id}`}>
          <h6 className="card-title">{p.name}</h6>
        </Link>
        <div className="mb-2">
          <strong>₹{p.price}</strong>{' '}
          {p.originalPrice ? <span className="text-muted text-decoration-line-through small">₹{p.originalPrice}</span> : null}
        </div>
        <div className="text-warning mb-2">{'★'.repeat(Math.round(p.rating||0))}<span className="text-muted small"> ({p.numReviews||0})</span></div>
        <div className="mt-auto d-flex gap-2">
          <button disabled={busy} className="btn btn-primary w-100" onClick={addCart}>Add to Cart</button>
          <button disabled={busy} className="btn btn-outline-secondary" onClick={addWish}><i className="bi bi-heart"></i></button>
        </div>
      </div>
    </div>
  )
}
