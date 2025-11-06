import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()

app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))

// Simple health
app.get('/api/health', (req, res) => res.json({ ok: true }))

// Get products
app.get('/api/products', async (req, res, next) => {
    try {
        const products = db.getProducts()
        res.json(products)
    } catch (err) {
        next(err)
    }
})

// Add / update cart
app.post('/api/cart', async (req, res, next) => {
    try {
        const { productId, qty } = req.body
        if (!productId || typeof qty !== 'number') return res.status(400).json({ error: 'productId and qty required' })
        const userId = 1 // mock user
        const updated = db.addOrUpdateCartItem(userId, productId, qty)
        const cart = db.getCart(userId)
        res.json(cart)
    } catch (err) {
        next(err)
    }
})

// Get cart
app.get('/api/cart', async (req, res, next) => {
    try {
        const userId = 1
        const cart = db.getCart(userId)
        res.json(cart)
    } catch (err) {
        next(err)
    }
})


app.delete('/api/cart/:id', async (req, res, next) => {
    try {
        const productId = Number(req.params.id)
        const userId = 1
        db.removeCartItem(userId, productId)
        const cart = db.getCart(userId)
        res.json(cart)
    } catch (err) {
        next(err)
    }
})

// Checkout
app.post('/api/checkout', async (req, res, next) => {
    try {
        const { cartItems, name, email } = req.body
        if (!name || !email) return res.status(400).json({ error: 'name and email required' })
        // For safety, compute total from DB
        const userId = 1
        const cart = db.getCart(userId)
        const total = cart.total
        const receiptId = `R-${Date.now().toString(36).toUpperCase()}`
        const timestamp = new Date().toISOString()
        // Clear cart
        db.clearCart(userId)
        res.json({ receiptId, total, timestamp })
    } catch (err) {
        next(err)
    }
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: err?.message || 'internal error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Mock E-Com Cart backend listening on http://localhost:${PORT}`)
})