'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createOrder, clearCart } from '@/app/actions/cart'
import { motion } from 'framer-motion'
import { CreditCard, Banknote } from 'lucide-react'

export function CartSummary({ total, items }: { total: number; items: any[] }) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'transfer'>('stripe')
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    notes: '',
  })

  const shipping = 50
  const tax = total * 0.16
  const finalTotal = total + shipping + tax

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (paymentMethod === 'stripe') {
        // Stripe checkout
        const order = await createOrder(
          'stripe',
          formData.shippingAddress,
          formData.shippingCity,
          formData.shippingPostalCode,
          formData.shippingCountry,
          undefined,
          formData.notes
        )
        // Aquí iría la redirección a Stripe
        router.push(`/checkout/success?orderId=${order.id}`)
      } else {
        // Transferencia bancaria
        const order = await createOrder(
          'transfer',
          formData.shippingAddress,
          formData.shippingCity,
          formData.shippingPostalCode,
          formData.shippingCountry,
          undefined,
          formData.notes
        )
        router.push(`/checkout/transfer?orderId=${order.id}`)
      }
    } catch (err) {
      console.error('Error creating order:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8 sticky top-24 h-fit">
      <h2 className="text-2xl font-bold text-foreground mb-6">Resumen</h2>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Envío</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Impuesto (16%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-foreground">
          <span>Total</span>
          <span className="text-accent">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <p className="font-semibold text-foreground mb-4">Método de Pago</p>
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentMethod('stripe')}
            className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
              paymentMethod === 'stripe'
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-muted'
            }`}
          >
            <CreditCard size={20} className={paymentMethod === 'stripe' ? 'text-accent' : 'text-muted-foreground'} />
            <div className="text-left">
              <p className="font-semibold">Tarjeta de Crédito</p>
              <p className="text-xs text-muted-foreground">Pago con Stripe</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentMethod('transfer')}
            className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
              paymentMethod === 'transfer'
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-muted'
            }`}
          >
            <Banknote size={20} className={paymentMethod === 'transfer' ? 'text-accent' : 'text-muted-foreground'} />
            <div className="text-left">
              <p className="font-semibold">Transferencia Bancaria</p>
              <p className="text-xs text-muted-foreground">Datos por correo</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Shipping Form */}
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full bg-accent hover:bg-accent/90 text-primary mb-4"
        >
          Continuar
        </Button>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-4">
          <input
            type="text"
            placeholder="Dirección"
            required
            value={formData.shippingAddress}
            onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground"
          />
          <input
            type="text"
            placeholder="Ciudad"
            required
            value={formData.shippingCity}
            onChange={(e) => setFormData({ ...formData, shippingCity: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground"
          />
          <input
            type="text"
            placeholder="Código Postal"
            required
            value={formData.shippingPostalCode}
            onChange={(e) => setFormData({ ...formData, shippingPostalCode: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground"
          />
          <input
            type="text"
            placeholder="País"
            required
            value={formData.shippingCountry}
            onChange={(e) => setFormData({ ...formData, shippingCountry: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground"
          />
          <textarea
            placeholder="Notas (opcional)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-primary"
          >
            {isLoading ? 'Procesando...' : `Confirmar Compra ($${finalTotal.toFixed(2)})`}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowForm(false)}
            className="w-full"
          >
            Editar Carrito
          </Button>
        </form>
      )}

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Tu información está protegida y cifrada
      </p>
    </div>
  )
}
