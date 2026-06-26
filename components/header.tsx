'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

interface HeaderProps {
  session: any
  cartCount?: number
}

export function Header({ session, cartCount = 0 }: HeaderProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/sign-in')
  }

  const isAdmin = session?.user?.role === 'admin'
  const isSeller = session?.user?.role === 'seller'

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="text-accent text-3xl"
          >
            ⚙️
          </motion.div>
          <span>PartsHub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-accent transition">Inicio</Link>
          <Link href="/catalog" className="hover:text-accent transition">Catálogo</Link>
          
          {isAdmin && (
            <Link href="/admin" className="hover:text-accent transition flex items-center gap-2">
              <LayoutDashboard size={18} /> Admin
            </Link>
          )}
          
          {isSeller && (
            <Link href="/seller" className="hover:text-accent transition flex items-center gap-2">
              <LayoutDashboard size={18} /> Mis Ventas
            </Link>
          )}
          
          {session?.user ? (
            <>
              <Link href="/cart" className="hover:text-accent transition flex items-center gap-2 relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-accent text-primary rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
              <Link href="/dashboard" className="hover:text-accent transition">Mi Cuenta</Link>
              <button
                onClick={handleLogout}
                className="hover:text-accent transition flex items-center gap-2"
              >
                <LogOut size={18} /> Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="hover:text-accent transition">Ingresar</Link>
              <Link
                href="/sign-up"
                className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-primary-dark border-t border-primary-light py-4 px-4"
        >
          <div className="flex flex-col gap-4">
            <Link href="/" className="hover:text-accent transition">Inicio</Link>
            <Link href="/catalog" className="hover:text-accent transition">Catálogo</Link>
            
            {isAdmin && (
              <Link href="/admin" className="hover:text-accent transition flex items-center gap-2">
                <LayoutDashboard size={18} /> Admin
              </Link>
            )}
            
            {isSeller && (
              <Link href="/seller" className="hover:text-accent transition flex items-center gap-2">
                <LayoutDashboard size={18} /> Mis Ventas
              </Link>
            )}
            
            {session?.user ? (
              <>
                <Link href="/cart" className="hover:text-accent transition flex items-center gap-2">
                  <ShoppingCart size={18} /> Carrito ({cartCount})
                </Link>
                <Link href="/dashboard" className="hover:text-accent transition">Mi Cuenta</Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-accent transition flex items-center gap-2 justify-start"
                >
                  <LogOut size={18} /> Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="hover:text-accent transition">Ingresar</Link>
                <Link
                  href="/sign-up"
                  className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-center"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}
