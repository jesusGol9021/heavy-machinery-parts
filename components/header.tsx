'use client'

import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
import { useState } from 'react'
import { ShoppingCart, Menu, X, LogOut, Home } from 'lucide-react'

export function Header() {
  const { user, logout } = useAuth()
  const { items: cartItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur text-white shadow-xl border-b border-orange-500/20">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl hover:opacity-80 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center font-bold">
            PH
          </div>
          <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">PartsHub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 hover:text-orange-400 transition text-sm">
            <Home size={18} />
            Inicio
          </Link>
          <Link href="/products" className="hover:text-orange-400 transition text-sm">
            Productos
          </Link>
          <Link href="/contact" className="hover:text-orange-400 transition text-sm">
            Contacto
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Carrito */}
          <Link href="/cart" className="hover:text-orange-400 transition flex items-center gap-2 relative group">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center group-hover:bg-orange-600 transition">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              {/* User Menu Desktop */}
              <div className="hidden md:flex items-center gap-4">
                <Link href="/dashboard" className="hover:text-orange-400 transition text-sm">
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="hover:text-red-400 transition flex items-center gap-2 text-sm"
                >
                  <LogOut size={18} />
                  Salir
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="hidden md:block hover:text-orange-400 transition text-sm">
                Ingresar
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition text-sm font-semibold"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && user && (
        <div className="md:hidden bg-slate-800/95 border-t border-orange-500/20 py-4 px-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 hover:text-orange-400 transition">
              <Home size={18} />
              Inicio
            </Link>
            <Link href="/products" className="hover:text-orange-400 transition">
              Productos
            </Link>
            <Link href="/contact" className="hover:text-orange-400 transition">
              Contacto
            </Link>
            <div className="border-t border-slate-700 pt-4">
              <Link href="/dashboard" className="block hover:text-orange-400 transition mb-2">
                {user.name}
              </Link>
              <button
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center gap-2 hover:text-red-400 transition w-full"
              >
                <LogOut size={18} />
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
