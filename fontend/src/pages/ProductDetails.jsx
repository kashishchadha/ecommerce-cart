import { useEffect, useState } from 'react'
import { fetchProducts, addToCart } from '../api'
import { useParams } from 'react-router-dom'
import { formatINR } from '../utils/format'

export default function ProductDetails(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  useEffect(()=>{
    let mounted = true
    fetchProducts().then((all)=>{
      if(!mounted) return
      const p = all.find(x=>String(x.id)===String(id))
      setProduct(p)
    }).catch(()=>{}).finally(()=>mounted && setLoading(false))
    return ()=> mounted=false
  },[id])

  if(loading) return <div className="center">Loading…</div>
  if(!product) return <div className="center">Product not found</div>

  return (
    <div className="app-wrap">
      <div className="product-detail">
        <div className="pd-grid">
          <div className="pd-media">
            <img src={product.image} alt={product.name} onError={(e)=>{e.currentTarget.src='/images/placeholder.svg'}}/>
          </div>
          <div className="pd-info">
            <h2>{product.name}</h2>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="rating">{product.rating} ★</div>
              <div className="pd-stock" style={{color:product.stock>0?'#16a34a':'#dc2626'}}>{product.stock>0?`${product.stock} in stock`:'Out of stock'}</div>
            </div>
            <p className="pd-price"><strong>{formatINR(product.price)}</strong> {product.originalPrice && <small className="price-old">{formatINR(product.originalPrice)}</small>}</p>
            <p className="pd-desc">{product.description}</p>
            <div style={{display:'flex',gap:12,alignItems:'center',marginTop:16}}>
              <div className="qty-picker">
                <button onClick={()=>setQty(Math.max(1,qty-1))}>-</button>
                <span>{qty}</span>
                <button onClick={()=>setQty(qty+1)}>+</button>
              </div>
              <button className="btn-primary" onClick={()=>addToCart(product.id, qty)}>Add to cart</button>
              <button className="btn-ghost">Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
