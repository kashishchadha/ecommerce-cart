import { useEffect, useState } from 'react'
import { fetchProducts, addToCart } from '../api'
import { Link } from 'react-router-dom'
import { formatINR } from '../utils/format'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [addedProducts, setAddedProducts] = useState({})

  useEffect(() => {
    let mounted = true
    fetchProducts()
      .then((p) => mounted && setProducts(p))
      .catch(() => {})
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [])

  const handleAddToCart = (productId) => {
    addToCart(productId, 1)
    setAddedProducts(prev => ({ ...prev, [productId]: true }))
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [productId]: false }))
    }, 2000)
  }

  if (loading) return <div className="center">Loading products…</div>

  return (
    <div className="app-wrap">
      <section className="hero">
        <div className="hero-left">
          <h1>Discover Curated Fashion</h1>
          <p>Timeless pieces crafted for those who value quality, style, and sustainability. Experience fashion that speaks to your individuality.</p>
          <div className="hero-cta">
            <button className="btn-primary">Explore Collection</button>
            <button className="btn-ghost">Shop By Category</button>
          </div>
        </div>
      </section>

      <div className="layout">
        <aside className="filters">
          <h3>Refine Your Search</h3>
          <div style={{marginTop:'var(--spacing-md)'}}>
            <div style={{marginBottom:'var(--spacing-lg)'}}>
              <h4 style={{fontSize:'0.85rem',marginBottom:'var(--spacing-md)',color:'var(--muted)',fontWeight:700,letterSpacing:'0.5px'}}>CATEGORY</h4>
              <label><input type="checkbox" /> Men's Fashion</label>
              <label><input type="checkbox" /> Women's Fashion</label>
              <label><input type="checkbox" /> Accessories</label>
            </div>
            <div style={{marginBottom:'var(--spacing-md)'}}>
              <h4 style={{fontSize:'0.85rem',marginBottom:'var(--spacing-md)',color:'var(--muted)',fontWeight:700,letterSpacing:'0.5px'}}>PRICE RANGE</h4>
              <label><input type="checkbox" /> Under ₹2000</label>
              <label><input type="checkbox" /> ₹2000 - ₹5000</label>
              <label><input type="checkbox" /> Above ₹5000</label>
            </div>
          </div>
        </aside>

        <div>
          <div style={{marginBottom:'var(--spacing-lg)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 style={{margin:0}}>Featured Products</h2>
            <select style={{padding:'var(--spacing-sm) var(--spacing-md)',borderRadius:'8px',border:'1px solid rgba(13,17,23,0.1)'}}>
              <option>Sort by: Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
          <div className="products">
            {products.map((p) => (
              <div key={p.id} className="card">
                <div className="thumb">
                  <img src={p.image} alt={p.name} onError={(e)=>{e.currentTarget.src='/images/placeholder.svg'}} />
                </div>
                <h3>{p.name}</h3>
                <div className="rating">{p.rating} ★</div>
                <div className="price-row">
                  <span className="price-current">{formatINR(p.price)}</span>
                  {p.originalPrice && <span className="price-old">{formatINR(p.originalPrice)}</span>}
                </div>
                <div className="card-actions">
                  <button className="btn-primary" onClick={() => handleAddToCart(p.id)} style={{flex:1,padding:'8px 12px',fontSize:'0.9rem'}}>
                    {addedProducts[p.id] ? '✓ Added' : 'Add to Cart'}
                  </button>
                  <Link to={`/product/${p.id}`} className="btn-ghost" style={{flex:1,textAlign:'center',padding:'8px 12px',fontSize:'0.9rem'}}>View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
