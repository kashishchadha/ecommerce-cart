import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchCart } from '../api'
import MiniCart from './MiniCart'

export default function Navbar() {
  const [count, setCount] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    fetchCart().then((c) => mounted && setCount(c.items.length)).catch(() => {})

    const onUpdate = () => fetchCart().then((c) => mounted && setCount(c.items.length)).catch(() => {})
    if (typeof window !== 'undefined') window.addEventListener('cartUpdated', onUpdate)
    return () => { mounted = false; if (typeof window !== 'undefined') window.removeEventListener('cartUpdated', onUpdate) }
  }, [])

  return (
    <>
      <header className="nav">
        <div className="app-wrap nav-inner">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <Link to="/" className="brand">Mock E-Com</Link>
          </div>

          <div className="search">
            <input placeholder="Search for brands, products and more" />
          </div>

          <div className="nav-links">
            <button className="icon-btn">Men</button>
            <button className="icon-btn">Women</button>
            <button className="icon-btn">Kids</button>
            <button className="icon-btn" onClick={() => setDrawerOpen(true)} aria-label="Open cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 9h-13z"></path><circle cx="9" cy="20" r="1"></circle><circle cx="19" cy="20" r="1"></circle></svg>
              <span className="badge">{count}</span>
            </button>
            <Link to="/checkout" className="icon-btn">Sign in</Link>
          </div>
        </div>
      </header>
      <MiniCart open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
