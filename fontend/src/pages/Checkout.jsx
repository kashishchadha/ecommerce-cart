import { useState } from 'react'
import { fetchCart, checkout } from '../api'
import { useEffect } from 'react'
import { formatINR } from '../utils/format'

export default function Checkout() {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [receipt, setReceipt] = useState(null)

  useEffect(() => { fetchCart().then(setCart).catch(() => {}) }, [])

  const submit = async (e) => {
    e.preventDefault()
    const res = await checkout(cart.items, name, email)
    setReceipt(res)
  }

  return (
    <div className="app-wrap">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form onSubmit={submit} className="checkout-form">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="btn-primary" type="submit">Pay {formatINR(cart.total)}</button>
        </form>

        <div className="summary">
          <h3>Order Summary</h3>
          {cart.items.map((it) => (
            <div key={it.productId} className="sum-item" style={{display:'flex',justifyContent:'space-between',padding:'8px 0'}}>
              <div>{it.product?.name} x {it.qty}</div>
              <div>{formatINR(it.subtotal)}</div>
            </div>
          ))}
          <div className="sum-total" style={{marginTop:12,fontWeight:700}}>Total: {formatINR(cart.total)}</div>
        </div>
      </div>

      {receipt && (
        <div className="receipt" style={{marginTop:16}}>
          <h3>Receipt</h3>
          <div>Receipt ID: {receipt.receiptId}</div>
          <div>Total: {formatINR(receipt.total)}</div>
          <div>Time: {new Date(receipt.timestamp).toLocaleString()}</div>
        </div>
      )}
    </div>
  )
}
