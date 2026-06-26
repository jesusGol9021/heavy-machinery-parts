'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react'
import { Header } from '@/components/header'

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    try {
      await login(formData.email, formData.password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center font-bold text-white text-3xl mx-auto mb-4 shadow-lg">
              PH
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
            <p className="text-slate-400">Accede a tu cuenta de PartsHub</p>
          </div>

          {/* Card */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl shadow-2xl p-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="text-red-400 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="password"
                    required
                    placeholder="Tu contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Recuérdame</span>
                </label>
                <Link href="#" className="text-orange-400 hover:text-orange-300 transition">
                  ¿Olvidaste contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Iniciando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            <p className="text-center text-slate-400 mt-6 text-sm">
              ¿No tienes cuenta?{' '}
              <Link href="/sign-up" className="text-orange-400 font-semibold hover:text-orange-300 transition">
                Crea una aquí
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center text-sm text-blue-300">
            <p className="font-semibold mb-2">Credenciales de prueba:</p>
            <p className="text-blue-400">Email: test@example.com</p>
            <p className="text-blue-400">Contraseña: password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
