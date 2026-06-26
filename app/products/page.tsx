'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Filter, ShoppingCart, Star } from 'lucide-react'

const CATEGORIES = [
  'Motor', 'Transmisión', 'Hidráulica', 'Eléctrico', 'Chasis', 'Accesorios'
]

const PRODUCTS = [
  {
    id: 1,
    name: 'Filtro de Aire Premium',
    category: 'Motor',
    price: 125.50,
    stock: 45,
    warranty: '1 año',
    rating: 4.8,
    image: '⚙️',
  },
  {
    id: 2,
    name: 'Cilindro Hidráulico 50mm',
    category: 'Hidráulica',
    price: 850.00,
    stock: 12,
    warranty: '2 años',
    rating: 4.9,
    image: '💨',
  },
  {
    id: 3,
    name: 'Banda de Transmisión',
    category: 'Transmisión',
    price: 245.75,
    stock: 30,
    warranty: '6 meses',
    rating: 4.6,
    image: '🔗',
  },
  {
    id: 4,
    name: 'Batería Industrial 12V',
    category: 'Eléctrico',
    price: 1200.00,
    stock: 8,
    warranty: '1 año',
    rating: 4.7,
    image: '⚡',
  },
  {
    id: 5,
    name: 'Válvula Solenoide 24V',
    category: 'Hidráulica',
    price: 320.00,
    stock: 20,
    warranty: '6 meses',
    rating: 4.5,
    image: '💨',
  },
  {
    id: 6,
    name: 'Rueda Dentada 48T',
    category: 'Chasis',
    price: 450.00,
    stock: 15,
    warranty: '1 año',
    rating: 4.8,
    image: '🏗️',
  },
  {
    id: 7,
    name: 'Manguera Hidráulica 3/4"',
    category: 'Hidráulica',
    price: 85.00,
    stock: 60,
    warranty: '6 meses',
    rating: 4.4,
    image: '💨',
  },
  {
    id: 8,
    name: 'Alternador 80A',
    category: 'Eléctrico',
    price: 650.00,
    stock: 10,
    warranty: '1 año',
    rating: 4.9,
    image: '⚡',
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState(0)

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = () => {
    setCartItems(cartItems + 1)
    alert('Producto agregado al carrito!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="bg-sidebar text-sidebar-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-primary">
              PH
            </div>
            <span className="text-xl font-bold hidden md:inline">PartsHub</span>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <Link href="/products" className="text-accent font-semibold">Productos</Link>
            <Link href="/contact" className="hover:text-accent transition">Contacto</Link>
            <div className="relative">
              <ShoppingCart className="cursor-pointer hover:text-accent transition" size={24} />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Catálogo de Repuestos</h1>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Todas las categorías</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                {/* Product Image */}
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 h-40 flex items-center justify-center text-6xl">
                  {product.image}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-foreground mt-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>

                  {/* Stock and Warranty */}
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-muted-foreground">
                    <div>Stock: {product.stock}</div>
                    <div>Garantía: {product.warranty}</div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                    <div className="text-2xl font-bold text-accent">
                      ${product.price.toFixed(2)}
                    </div>
                    <button
                      onClick={addToCart}
                      className="px-3 py-2 bg-accent hover:bg-accent/90 text-primary rounded-lg text-sm font-semibold transition"
                    >
                      +Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
