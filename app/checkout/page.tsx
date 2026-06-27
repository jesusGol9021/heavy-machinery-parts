'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { CreditCard, MapPin, Mail, Phone, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card')
  const [loading, setLoading] = useState(false)

  const subtotal = total
  const shipping = subtotal > 500 ? 0 : 15
  const tax = subtotal * 0.08
  const finalTotal = subtotal + shipping + tax

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.email && formData.address && formData.city) {
      setStep('payment')
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const id = `ORD-${Date.now()}`
    setOrderId(id)
    setOrderPlaced(true)
    setStep('confirmation')
    clearCart()
    setLoading(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Debes iniciar sesión</h1>
          <p className="text-gray-400 mb-8">Por favor inicia sesión para continuar con el checkout</p>
          <Link href="/sign-in" className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Tu carrito está vacío</h1>
          <Link href="/products" className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
            Continuar Comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Steps Indicator */}
        <div className="flex justify-between mb-12">
          {(['shipping', 'payment', 'confirmation'] as const).map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step === s
                    ? 'bg-orange-500 text-white'
                    : (['shipping', 'payment'].includes(s) && step === 'confirmation') ||
                        (s === 'payment' && step === 'payment') ||
                        (s === 'shipping' && ['payment', 'confirmation'].includes(step))
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-700 text-gray-400'
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && <div className={`flex-1 h-1 mx-4 transition ${step === 'confirmation' || (i === 0 && ['payment', 'confirmation'].includes(step)) ? 'bg-green-500' : 'bg-slate-700'}`} />}
            </div>
          ))}
        </div>

        {orderPlaced ? (
          // Confirmation Page
          <div className="bg-slate-800 border border-green-500/30 rounded-xl p-8 text-center max-w-2xl mx-auto">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">¡Orden Confirmada!</h1>
            <p className="text-gray-300 text-lg mb-6">Tu pedido ha sido procesado exitosamente</p>

            <div className="bg-slate-700/50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-white mb-4">Detalles de la Orden</h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Número de Orden:</span>
                  <span className="font-mono text-orange-400">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cliente:</span>
                  <span>{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dirección de Envío:</span>
                  <span>{formData.address}, {formData.city}</span>
                </div>
                <div className="border-t border-slate-600 pt-3 mt-3 flex justify-between text-lg font-bold text-white">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8 text-left">
              <h3 className="font-bold text-blue-400 mb-2">¿Qué sigue?</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ Recibirás un email de confirmación en {user.email}</li>
                <li>✓ Tu orden será procesada en 24-48 horas</li>
                <li>✓ Podrás rastrear tu pedido desde tu dashboard</li>
                <li>✓ Entrega estimada: 3-5 días hábiles</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="block w-full px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition"
              >
                Ir a Mi Dashboard
              </Link>
              <Link
                href="/products"
                className="block w-full px-8 py-3 border border-gray-600 hover:border-gray-400 text-white rounded-lg font-semibold transition"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        ) : step === 'shipping' ? (
          // Shipping Form
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="text-orange-500" />
                Dirección de Envío
              </h2>

              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Dirección</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ciudad</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Código Postal</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Continuar al Pago
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Resumen de Orden</h3>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-300">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envío:</span>
                  <span>{shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Impuestos (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700 pt-2 flex justify-between text-lg font-bold text-orange-400">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : step === 'payment' ? (
          // Payment Form
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="text-orange-500" />
                Método de Pago
              </h2>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="flex items-center p-4 bg-slate-700/50 border-2 border-orange-500 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'transfer')}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-white font-semibold">Tarjeta de Crédito/Débito</span>
                  </label>

                  <label className="flex items-center p-4 bg-slate-700/50 border-2 border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition">
                    <input
                      type="radio"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'transfer')}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-white font-semibold">Transferencia Bancaria</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Número de Tarjeta</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Vencimiento</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="font-bold text-blue-400 mb-3">Datos de Transferencia</h4>
                    <div className="text-gray-300 space-y-2 text-sm">
                      <p><strong>Banco:</strong> Banco PartsHub</p>
                      <p><strong>Número de Cuenta:</strong> 123456789</p>
                      <p><strong>CLABE:</strong> 002987654321000000001</p>
                      <p><strong>Concepto:</strong> {orderId || 'Compra PartsHub'}</p>
                      <p className="text-yellow-400 text-xs mt-3">⚠️ Por favor completa la transferencia en 24 horas</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Procesando...' : 'Completar Pago'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Resumen Final</h3>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-300">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envío:</span>
                  <span>{shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Impuestos:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700 pt-2 flex justify-between text-lg font-bold text-orange-400">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
