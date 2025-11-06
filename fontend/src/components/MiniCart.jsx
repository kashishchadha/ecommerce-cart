import React from 'react'
import { fetchCart, addToCart, removeFromCart } from '../api'
import { formatINR } from '../utils/format'

export default function MiniCart({ open, onClose }) {
  const [cart, setCart] = React.useState({ items: [], total: 0 })
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!open) return
    let mounted = true
    setLoading(true)
    fetchCart().then((c) => mounted && setCart(c)).catch(() => {}).finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [open])

  const changeQty = (id, qty) => addToCart(id, qty).then((c) => setCart(c))
  const remove = (id) => removeFromCart(id).then((c) => setCart(c))

  return (
    <>
      <div className={`mini-cart-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`mini-cart ${open ? 'open' : ''}`} role="dialog" aria-hidden={!open}>
      <div className="mc-header">
        <strong>Your Cart</strong>
        <button className="link" onClick={onClose}>Close</button>
      </div>
      <div className="mc-body">
        {loading && <div className="center">Loading…</div>}
        {!loading && cart.items.length === 0 && <div className="center">Your cart is empty</div>}
        {cart.items.map((it) => (
          <div key={it.productId} className="mc-item">
            <img src={it.product?.image} alt={it.product?.name} onError={(e)=>{e.currentTarget.src='/images/placeholder.svg'}}/>
            <div className="mc-meta">
              <div className="mc-title">{it.product?.name}</div>
              <div className="mc-qty">
                <button onClick={() => changeQty(it.productId, Math.max(1, it.qty - 1))}>-</button>
                <span>{it.qty}</span>
                <button onClick={() => changeQty(it.productId, it.qty + 1)}>+</button>
              </div>
            </div>
            <div className="mc-right">
              <div>{formatINR(it.subtotal)}</div>
              <button className="link" onClick={() => remove(it.productId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mc-footer">
        <div className="mc-total">Total: {formatINR(cart.total)}</div>
        <div style={{display:'flex',gap:8}}>
          <a href="/cart" className="btn">View Cart</a>
          <a href="/checkout" className="btn">Checkout</a>
        </div>
      </div>
    </div>
    </>
  )
}
