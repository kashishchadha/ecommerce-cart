const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`)
  if (!res.ok) throw new Error('failed to fetch products')
  return res.json()
}

export async function fetchCart() {
  const res = await fetch(`${API_BASE}/api/cart`)
  if (!res.ok) throw new Error('failed to fetch cart')
  return res.json()
}

export async function addToCart(productId, qty) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty })
  })
  if (!res.ok) throw new Error('failed to add to cart')
  const json = await res.json()
  // notify app that cart changed
  if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }
  return json
}

export async function removeFromCart(productId) {
  const res = await fetch(`${API_BASE}/api/cart/${productId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('failed to remove')
  const json = await res.json()
  if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }
  return json
}

export async function checkout(cartItems, name, email) {
  const res = await fetch(`${API_BASE}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems, name, email })
  })
  if (!res.ok) throw new Error('checkout failed')
  const json = await res.json()
  if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }
  return json
}

export default { fetchProducts, fetchCart, addToCart, removeFromCart, checkout }
