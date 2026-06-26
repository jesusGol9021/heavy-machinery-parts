import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect, notFound } from 'next/headers'
import { getOrderById } from '@/app/actions/orders'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  let order
  try {
    order = await getOrderById(parseInt(params.id))
  } catch (err) {
    notFound()
  }

  const subtotal = parseFloat(order.totalAmount.toString())
  const shipping = 50
  const tax = (subtotal - shipping) / 1.16 * 0.16

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <Link href="/orders" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ArrowLeft size={20} /> Volver a Órdenes
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Header */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Orden #{order.id}</h1>
                  <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('es-ES')}</p>
                </div>
                <p className={`text-sm font-semibold px-4 py-2 rounded-full ${
                  order.status === 'completed' ? 'bg-green-100 text-green-700' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  order.status === 'pending_payment' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {order.status === 'completed' ? 'Completada' :
                   order.status === 'pending' ? 'En Proceso' :
                   order.status === 'pending_payment' ? 'Pendiente de Pago' :
                   'Cancelada'}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 py-6 border-t border-border border-b">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fecha de Compra</p>
                  <p className="font-semibold text-foreground">{new Date(order.createdAt).toLocaleDateString('es-ES')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Método de Pago</p>
                  <p className="font-semibold text-foreground">{order.paymentMethod === 'stripe' ? 'Tarjeta de Crédito' : 'Transferencia'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Items</p>
                  <p className="font-semibold text-foreground">{order.items?.length || 0} productos</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Productos</h2>
              <div className="space-y-4">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex gap-6 pb-4 border-b border-border last:border-0">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg w-20 h-20 flex items-center justify-center text-2xl flex-shrink-0">
                      ⚙️
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.product?.name}</p>
                      <p className="text-sm text-muted-foreground">{item.product?.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                      <p className="font-semibold text-foreground">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Dirección de Envío</h2>
              <div className="space-y-2 text-foreground">
                <p>{order.shippingAddress}</p>
                <p>{order.shippingCity}, {order.shippingPostalCode}</p>
                <p>{order.shippingCountry}</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Summary */}
          <div className="bg-card border border-border rounded-xl p-8 h-fit sticky top-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">Resumen</h2>

            <div className="space-y-4 pb-6 border-b border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${(subtotal - shipping).toFixed(2)}</span>
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
                <span className="text-accent">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {order.status === 'pending_payment' && (
              <button className="w-full mt-6 bg-accent text-primary px-4 py-2 rounded-lg hover:bg-accent/90 transition font-semibold">
                Completar Pago
              </button>
            )}

            {order.notes && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Notas</p>
                <p className="text-foreground">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
