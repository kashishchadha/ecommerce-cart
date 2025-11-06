// Minimal in-memory DB with optional SQLite persistence later
const productsSeed = [
  { id: 1, name: 'Vintage Sneakers', price: 3999.0, image: 'https://picsum.photos/id/102/800/600', rating:4.5, originalPrice:4999, stock: 12, description: 'Comfortable vintage-style sneakers with durable rubber sole and breathable canvas upper.' },
  { id: 2, name: 'Classic Tee', price: 599.0, image: 'https://picsum.photos/id/100/800/600', rating:4.2, originalPrice:899, stock: 48, description: 'Premium cotton tee with a relaxed fit — wardrobe staple for everyday wear.' },
  { id: 3, name: 'Denim Jacket', price: 4999.0, image: 'https://picsum.photos/id/1011/800/600', rating:4.7, originalPrice:6999, stock: 7, description: 'Heavyweight denim jacket with classic tailoring and brushed hardware.' },
  { id: 4, name: 'Leather Wallet', price: 1199.0, image: 'https://picsum.photos/id/1060/800/600', rating:4.1, originalPrice:1599, stock: 30, description: 'Hand-stitched leather wallet with multiple card slots and coin compartment.' },
  { id: 5, name: 'Sunglasses', price: 2499.0, image: 'https://picsum.photos/id/1025/800/600', rating:4.3, originalPrice:3299, stock: 18, description: 'Polarized sunglasses with UV400 protection and lightweight frame.' }
]

const carts = new Map()

function getProducts() {
  return productsSeed
}

function findProduct(id) {
  return productsSeed.find((p) => p.id === Number(id))
}

function getCart(userId = 1) {
  const raw = carts.get(userId) || []
  const items = raw.map((it) => {
    const product = findProduct(it.productId)
    const subtotal = product ? Number((product.price * it.qty).toFixed(2)) : 0
    return { ...it, product, subtotal }
  })
  const total = Number(items.reduce((s, i) => s + i.subtotal, 0).toFixed(2))
  return { items, total }
}

function addOrUpdateCartItem(userId = 1, productId, qty) {
  const product = findProduct(productId)
  if (!product) throw new Error('product not found')
  const raw = carts.get(userId) || []
  const i = raw.find((r) => r.productId === Number(productId))
  if (i) {
    i.qty = qty
  } else {
    raw.push({ productId: Number(productId), qty })
  }
  carts.set(userId, raw)
  return getCart(userId)
}

function removeCartItem(userId = 1, productId) {
  const raw = carts.get(userId) || []
  const filtered = raw.filter((r) => r.productId !== Number(productId))
  carts.set(userId, filtered)
  return getCart(userId)
}

function clearCart(userId = 1) {
  carts.set(userId, [])
}

export default {
  getProducts,
  getCart,
  addOrUpdateCartItem,
  removeCartItem,
  clearCart
}
