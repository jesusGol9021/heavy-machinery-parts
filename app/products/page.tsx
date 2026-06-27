'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart, type CartItem } from '@/context/cart-context'
import { Search, Filter, ShoppingCart, Star } from 'lucide-react'
import { Header } from '@/components/header'

const CATEGORIES = ['Motor', 'Transmisión', 'Hidráulica', 'Eléctrico', 'Chasis', 'Accesorios']

const PRODUCTS = [
  {
    id: 1,
    name: 'Filtro de Aire Premium',
    category: 'Motor',
    price: 125.50,
    stock: 45,
    warranty: '1 año',
    rating: 4.8,
    image: '/products/filtro-aire.png',
    sku: 'AIR-001',
  },
  {
    id: 2,
    name: 'Cilindro Hidráulico 50mm',
    category: 'Hidráulica',
    price: 850.00,
    stock: 12,
    warranty: '2 años',
    rating: 4.9,
    image: '/products/cilindro-hidraulico.png',
    sku: 'HYD-001',
  },
  {
    id: 3,
    name: 'Banda de Transmisión',
    category: 'Transmisión',
    price: 245.75,
    stock: 30,
    warranty: '6 meses',
    rating: 4.6,
    image: '/products/banda-transmision.png',
    sku: 'TRA-001',
  },
  {
    id: 4,
    name: 'Batería Industrial 12V',
    category: 'Eléctrico',
    price: 1200.00,
    stock: 8,
    warranty: '1 año',
    rating: 4.7,
    image: '/products/bateria-industrial.png',
    sku: 'BAT-200',
  },
  {
    id: 5,
    name: 'Válvula Solenoide 24V',
    category: 'Hidráulica',
    price: 320.00,
    stock: 20,
    warranty: '6 meses',
    rating: 4.5,
    image: '/products/valvula-solenoide.png',
    sku: 'VS-024',
  },
  {
    id: 6,
    name: 'Rueda Dentada 48T',
    category: 'Chasis',
    price: 450.00,
    stock: 15,
    warranty: '1 año',
    rating: 4.4,
    image: '/products/rueda-dentada.png',
    sku: 'RD-48T',
  },
  {
    id: 7,
    name: 'Manguera Hidráulica 3/4"',
    category: 'Hidráulica',
    price: 85.00,
    stock: 60,
    warranty: '6 meses',
    rating: 4.6,
    image: '/products/manguera-hidraulica.png',
    sku: 'MH-34',
  },
  {
    id: 8,
    name: 'Alternador 80A',
    category: 'Eléctrico',
    price: 650.00,
    stock: 10,
    warranty: '1 año',
    rating: 4.7,
    image: '/products/alternador.png',
    sku: 'ALT-80',
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { addItem } = useCart()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      sku: product.sku,
    }
    addItem(cartItem)
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Catálogo de Productos</h1>
          <p className="text-slate-400">Explora nuestros {PRODUCTS.length} productos disponibles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 sticky top-24">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filtros
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="text-slate-300 text-sm font-medium mb-2 block">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-slate-300 text-sm font-medium mb-3 block">Categoría</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === ''
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Todas
                  </button>
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-orange-500/50 transition group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-slate-700/50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(product.rating) ? 'fill-orange-400 text-orange-400' : 'text-slate-600'}
                          />
                        ))}
                      </div>
                      <span className="text-slate-400 text-sm">{product.rating}</span>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 mb-4 text-sm text-slate-300">
                      <p>SKU: <span className="text-orange-400 font-semibold">{product.sku}</span></p>
                      <p>Stock: <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>{product.stock} disponibles</span></p>
                      <p>Garantía: <span className="text-blue-400">{product.warranty}</span></p>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full px-4 py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2 ${
                        addedToCart === product.id
                          ? 'bg-green-500 text-white'
                          : product.stock === 0
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      {addedToCart === product.id ? 'Agregado' : product.stock === 0 ? 'Sin stock' : 'Agregar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="text-slate-600 mb-4 mx-auto" size={64} />
                <h3 className="text-white text-xl font-semibold mb-2">No hay productos</h3>
                <p className="text-slate-400">Intenta con otros filtros o búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
