import { useEffect, useState } from 'react'
import { get, post, del } from '../services/api'
import Loader from '../components/Loader.jsx'

export default function Wishlist({ showToast }){
  const [data, setData] = useState(null)
  const load = async () => { const r = await get('/api/wishlist'); setData(r.data||{ products:[] }) }
  useEffect(()=>{ load() },[])

  if(!data) return <Loader />

  const moveToCart = async (pid) => { await post('/api/cart', { productId: pid, qty:1 }); await del('/api/wishlist', { productId: pid }); showToast('primary','Moved to Cart'); load() }
  const remove = async (pid) => { await del('/api/wishlist', { productId: pid }); showToast('danger','Removed from Wishlist'); load() }

  return (
    <div className="container container-narrow my-4">
      <h5 className="mb-3">My Wishlist</h5>
      <div className="row g-3">
        {data.products.map(p=>(
          <div className="col-md-4" key={p._id}>
            <div className="card h-100">
              <img className="card-img-top product-img" src={p.imageUrl} alt=""/>
              <div className="card-body d-flex flex-column">
                <h6>{p.name}</h6>
                <div className="mb-2"><strong>₹{p.price}</strong></div>
                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-primary" onClick={()=>moveToCart(p._id)}>Move to Cart</button>
                  <button className="btn btn-outline-danger" onClick={()=>remove(p._id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
