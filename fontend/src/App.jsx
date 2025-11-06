import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductDetails from './pages/ProductDetails'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
