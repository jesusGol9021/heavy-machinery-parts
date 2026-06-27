'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Zap, Users, Truck, Shield, ArrowRight, Star } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Repuestos de{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Maquinaria Pesada
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Tu tienda confiable para todos los repuestos de excavadoras, tractores, motoniveladoras y más.
              Entrega rápida, garantía certificada y precios competitivos.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products">
                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-semibold transition flex items-center gap-2 shadow-lg">
                  Ver Catálogo <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="px-8 py-3 border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10 rounded-lg font-semibold transition">
                  Crear Cuenta
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop"
                alt="Maquinaria Pesada"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-800/50 border-y border-slate-700 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">¿Por qué elegirnos?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-slate-700/50 border border-slate-600 hover:border-orange-500/50 transition">
              <Zap className="text-orange-400 mx-auto mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-slate-300 text-sm">Despacho en 24-48 horas a todo el país</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-slate-700/50 border border-slate-600 hover:border-orange-500/50 transition">
              <Shield className="text-green-400 mx-auto mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Garantía Certificada</h3>
              <p className="text-slate-300 text-sm">Todos nuestros productos tienen garantía</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-slate-700/50 border border-slate-600 hover:border-orange-500/50 transition">
              <Users className="text-blue-400 mx-auto mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-slate-300 text-sm">Equipo de atención disponible siempre</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-xl bg-slate-700/50 border border-slate-600 hover:border-orange-500/50 transition">
              <Truck className="text-red-400 mx-auto mb-4" size={32} />
              <h3 className="text-white font-semibold mb-2">Stock Completo</h3>
              <p className="text-slate-300 text-sm">+500 productos disponibles siempre</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              +5000
            </p>
            <p className="text-slate-300 text-lg">Clientes Satisfechos</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              +500
            </p>
            <p className="text-slate-300 text-lg">Productos Disponibles</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              4.8/5
            </p>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
            <p className="text-slate-300 text-lg">Valoración Promedio</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para encontrar el repuesto que necesitas?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Accede a nuestro catálogo completo y comienza a comprar con los mejores precios del mercado
          </p>
          <Link href="/sign-up">
            <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-slate-100 transition text-lg">
              Registrarse Ahora
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">PartsHub</h3>
              <p className="text-slate-400 text-sm">Tu tienda confiable de repuestos para maquinaria pesada</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/" className="hover:text-orange-400 transition">Inicio</Link></li>
                <li><Link href="/products" className="hover:text-orange-400 transition">Catálogo</Link></li>
                <li><Link href="/contact" className="hover:text-orange-400 transition">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Devoluciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>📧 info@partshub.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 123 Industrial Ave, City</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 PartsHub. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
