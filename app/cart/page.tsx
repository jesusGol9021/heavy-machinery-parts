'use client'

import { useCart } from '@/context/cart-context'
import { Header } from '@/components/header'
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <ShoppingCart className="text-slate-600 mb-4" size={64} />
          <h1 className="text-3xl font-bold text-white mb-2">Tu carrito está vacío</h1>
          <p className="text-slate-400 mb-8">Agrega productos para comenzar a comprar</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-semibold transition duration-200 flex items-center gap-2"
          >
            Ver Catálogo
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Carrito de Compras</h1>
        <p className="text-slate-400 mb-8">{items.length} producto{items.length !== 1 ? 's' : ''} en tu carrito</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 flex gap-6 hover:border-orange-500/50 transition"
              >
                {/* Imagen */}
                <div className="w-24 h-24 bg-slate-700/50 rounded-lg flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">SKU: {item.sku}</p>
                  <p className="text-orange-400 font-bold text-lg">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg px-3 py-2 h-fit">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-300 transition ml-4"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Resumen</h2>

              {/* Items Summary */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-700">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-slate-300 text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Envío</span>
                  <span className="text-white font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Impuestos</span>
                  <span className="text-white font-semibold">${(total * 0.08).toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-slate-700 pt-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    ${(total * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-semibold transition duration-200 mb-4">
                Ir al Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition duration-200 text-center block"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
