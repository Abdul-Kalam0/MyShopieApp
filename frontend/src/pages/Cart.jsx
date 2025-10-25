import { useEffect, useState } from 'react'
import { get, post, put, del } from '../services/api'
import Loader from '../components/Loader.jsx'
import { Link } from 'react-router-dom'

export default function Cart({ showToast }){
  const [cart, setCart] = useState(null)
  const load = async () => { const r = await get('/api/cart'); setCart(r.data || { items: [] }) }
  useEffect(()=>{ load() },[])

  if(!cart) return <Loader />

  const updateQty = async (pid, size, qty) => { await put('/api/cart', { productId: pid, size, qty }); showToast('info','Updated quantity'); load() }
  const remove = async (pid, size) => { await del('/api/cart', { productId: pid, size }); showToast('danger','Removed from cart'); load() }

  const price = cart.items.reduce((s,i)=> s + i.qty * (i.product?.price||0), 0)
  const discount = cart.items.reduce((s,i)=> s + i.qty * Math.max(0, (i.product?.originalPrice||0)-(i.product?.price||0)), 0)
  const delivery = cart.items.length ? 499 : 0
  const total = price + delivery

  return (
    <div className="container container-narrow my-4">
      <h5 className="text-center mb-4">My Cart ({cart.items.length})</h5>
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.items.map((it,idx)=>(
            <div className="card mb-3" key={idx}>
              <div className="row g-0">
                <div className="col-md-3 d-flex align-items-center">
                  <img className="img-fluid rounded-start" src={it.product?.imageUrl} alt=""/>
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h6 className="card-title">{it.product?.name}</h6>
                    <div className="mb-2"><strong>₹{it.product?.price}</strong>{' '}<span className="text-muted text-decoration-line-through">₹{it.product?.originalPrice}</span></div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-muted">Quantity:</span>
                      <div className="input-group" style={{maxWidth: '140px'}}>
                        <button className="btn btn-outline-secondary" onClick={()=>updateQty(it.product._id, it.size, Math.max(1, it.qty-1))}>-</button>
                        <input className="form-control text-center" value={it.qty} onChange={e=>updateQty(it.product._id, it.size, Math.max(1, Number(e.target.value)||1))}/>
                        <button className="btn btn-outline-secondary" onClick={()=>updateQty(it.product._id, it.size, it.qty+1)}>+</button>
                      </div>
                      <button className="btn btn-outline-danger ms-auto" onClick={()=>remove(it.product._id, it.size)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4">
          <div className="card p-3">
            <h6>Price Details</h6>
            <div className="d-flex justify-content-between"><span>Price ({cart.items.length} items)</span><span>₹{price}</span></div>
            <div className="d-flex justify-content-between"><span>Discount</span><span className="text-success">- ₹{discount}</span></div>
            <div className="d-flex justify-content-between"><span>Delivery Charges</span><span>₹{delivery}</span></div>
            <hr/>
            <div className="d-flex justify-content-between fw-bold"><span>Total Amount</span><span>₹{total}</span></div>
            <Link to="/checkout" className="btn btn-primary mt-3 w-100">Place Order</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
