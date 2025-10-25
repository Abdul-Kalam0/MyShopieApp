import { Link } from 'react-router-dom'

export default function Profile(){
  return (
    <div className="container container-narrow my-4">
      <h5>User Profile</h5>
      <div className="card p-3">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-2"><strong>Name:</strong> Demo User</div>
            <div className="mb-2"><strong>Email:</strong> demo@example.com</div>
            <div className="mb-2"><strong>Phone:</strong> 9999999999</div>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/orders" className="btn btn-outline-secondary me-2">Order History</Link>
            <Link to="/checkout" className="btn btn-primary">Add New Address</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
