import { useEffect, useState } from 'react'
import { get, post } from '../services/api'
import Loader from '../components/Loader.jsx'
import { useNavigate } from 'react-router-dom'

export default function Checkout({ showToast }){
  const [addresses, setAddresses] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name:'', line1:'', line2:'', city:'', state:'', zip:'', phone:'' })
  const [cart, setCart] = useState(null)
  const navigate = useNavigate()

  const load = async () => {
    const a = await get('/api/addresses'); setAddresses(a.data||[])
    const c = await get('/api/cart'); setCart(c.data||{ items: [] })
  }
  useEffect(()=>{ load() },[])

  if(!addresses || !cart) return <Loader />

  const addAddress = async () => {
    await post('/api/addresses', { ...form })
    setForm({ name:'', line1:'', line2:'', city:'', state:'', zip:'', phone:'' })
    showToast('success','Address Added')
    const a = await get('/api/addresses'); setAddresses(a.data||[])
  }

  const placeOrder = async () => {
    if(!selected){ showToast('danger','Please select an address'); return }
    await post('/api/orders', { addressId: selected })
    showToast('success', 'Order Placed Successfully.')
    navigate('/orders')
  }

  return (
    <div className="container container-narrow my-4">
      <div className="row g-4">
        <div className="col-lg-8">
          <h6>Choose Address</h6>
          {(addresses||[]).map(a=>(
            <div className="form-check card p-3 mb-2" key={a._id}>
              <input className="form-check-input" type="radio" name="addr" id={a._id} checked={selected===a._id} onChange={()=>setSelected(a._id)} />
              <label className="form-check-label" htmlFor={a._id}>
                <div><strong>{a.name}</strong> — {a.line1}, {a.city}, {a.state} {a.zip} • {a.phone}</div>
              </label>
            </div>
          ))}

          <div className="card p-3 mt-3">
            <h6>Add New Address</h6>
            <div className="row g-2">
              {Object.keys(form).map(k=>(
                <div className="col-md-6" key={k}>
                  <input className="form-control" placeholder={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>
                </div>
              ))}
            </div>
            <button className="btn btn-outline-primary mt-2" onClick={addAddress}>Save Address</button>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-3">
            <h6>Order Summary</h6>
            <div className="small text-muted mb-2">{cart.items.length} items</div>
            <button className="btn btn-primary w-100" onClick={placeOrder}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
