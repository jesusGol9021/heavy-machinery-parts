'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createQuotation } from '@/app/actions/quotations'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'

export function QuotationForm({ products, userEmail }: { products: any[]; userEmail: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
    email: userEmail,
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createQuotation(
        formData.email,
        formData.phone,
        formData.message,
        formData.productId ? parseInt(formData.productId) : undefined,
        formData.quantity
      )
      router.push('/quotations')
    } catch (err) {
      console.error('Error creating quotation:', err)
      alert('Error al crear la cotización. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Producto (Opcional)</label>
        <select
          value={formData.productId}
          onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="">Selecciona un producto...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} ({product.sku})
            </option>
          ))}
        </select>
      </div>

      {formData.productId && (
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Cantidad</label>
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Teléfono</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Mensaje</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
          className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          placeholder="Describe tus necesidades, especificaciones técnicas, volumen de compra, etc..."
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-2"
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          'Solicitar Cotización'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Tu información está protegida y solo será usada para procesar tu cotización.
      </p>
    </form>
  )
}
