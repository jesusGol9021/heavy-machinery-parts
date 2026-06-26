'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from '@/components/header'
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenido, <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{user.name}</span>
          </h1>
          <p className="text-slate-400">Gestiona tu cuenta y tus órdenes desde aquí</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Orders */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <ShoppingBag className="text-orange-400" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Órdenes Totales</p>
                <p className="text-white text-2xl font-bold">0</p>
              </div>
            </div>
          </div>

          {/* Favorites */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <Heart className="text-red-400" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Favoritos</p>
                <p className="text-white text-2xl font-bold">0</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <User className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white text-sm font-semibold truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Info Card */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Información de la Cuenta</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-400 text-sm mb-2">Nombre</p>
              <p className="text-white text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Email</p>
              <p className="text-white text-lg font-semibold">{user.email}</p>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Acciones</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-semibold transition duration-200 text-center"
              >
                Ver Catálogo
              </Link>
              <button
                onClick={() => {
                  logout()
                  router.push('/')
                }}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/cart"
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition flex items-center justify-between group"
          >
            <div>
              <h3 className="text-white font-semibold mb-1">Mi Carrito</h3>
              <p className="text-slate-400 text-sm">Ver productos agregados</p>
            </div>
            <ShoppingBag className="text-orange-400 group-hover:scale-110 transition" size={24} />
          </Link>

          <Link
            href="/products"
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition flex items-center justify-between group"
          >
            <div>
              <h3 className="text-white font-semibold mb-1">Explorar Productos</h3>
              <p className="text-slate-400 text-sm">Ver catálogo completo</p>
            </div>
            <ShoppingBag className="text-orange-400 group-hover:scale-110 transition" size={24} />
          </Link>
        </div>
      </div>
    </div>
  )
}
