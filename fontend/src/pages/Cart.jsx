import { useEffect, useState } from 'react'
import { fetchCart, addToCart, removeFromCart } from '../api'
import { formatINR } from '../utils/format'

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetchCart().then((c) => setCart(c)).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  if (loading) return <div className="center">Loading cart…</div>

  return (
    <div className="app-wrap">
      <h1 style={{marginBottom:'var(--spacing-xl)'}}>Shopping Cart</h1>
      {cart.items.length === 0 && <p className="center">Your cart is empty. Start shopping to add items!</p>}
      <div className="cart-list">
        {cart.items.map((it) => (
          <div key={it.productId} className="cart-row">
            <img src={it.product?.image} alt="" onError={(e)=>{e.currentTarget.src='/images/placeholder.svg'}} />
            <div className="cart-info">
              <h3>{it.product?.name}</h3>
              <div style={{color:'var(--muted)',fontSize:'1.05rem'}}>{formatINR(it.product?.price)} each</div>
              <div style={{marginTop:'var(--spacing-md)'}} className="qty">
                <button onClick={() => { addToCart(it.productId, Math.max(1, it.qty - 1)).then(load) }}>−</button>
                <span style={{minWidth:'40px',textAlign:'center',fontWeight:600}}>{it.qty}</span>
                <button onClick={() => { addToCart(it.productId, it.qty + 1).then(load) }}>+</button>
              </div>
            </div>
            <div className="cart-right">
              <div style={{fontWeight:700,fontSize:'1.5rem',color:'var(--primary)'}}>{formatINR(it.subtotal)}</div>
              <button className="btn-ghost" onClick={() => removeFromCart(it.productId).then(load)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {cart.items.length > 0 && (
        <div className="cart-total">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'var(--spacing-md)'}}>
            <span style={{fontSize:'1.25rem',color:'var(--muted)'}}>Subtotal:</span>
            <span style={{fontSize:'1.5rem',fontWeight:700}}>{formatINR(cart.total)}</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'var(--spacing-md)',borderTop:'1px solid rgba(13,17,23,0.1)'}}>
            <span style={{fontSize:'1.5rem',fontWeight:700}}>Total:</span>
            <span style={{fontSize:'2rem',fontWeight:700,color:'var(--primary)'}}>{formatINR(cart.total)}</span>
          </div>
          <div style={{marginTop:'var(--spacing-lg)'}}>
            <a href="/checkout" className="btn-primary" style={{width:'100%',textAlign:'center',display:'block',padding:'var(--spacing-md)'}}>Proceed to Checkout</a>
          </div>
        </div>
      )}
    </div>
  )
}
