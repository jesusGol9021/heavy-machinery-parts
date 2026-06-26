import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import { getUserOrders } from '@/app/actions/orders'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function OrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const orders = await getUserOrders()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Mis Órdenes</h1>
        <p className="text-muted-foreground mb-8">Visualiza el historial de tus compras</p>

        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-2xl text-muted-foreground mb-6">No tienes órdenes</p>
            <Link href="/catalog" className="inline-block bg-accent text-primary px-6 py-2 rounded-lg hover:bg-accent/90 transition">
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition flex justify-between items-center group"
              >
                <div>
                  <p className="font-bold text-lg text-foreground">Orden #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('es-ES')}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Método: {order.paymentMethod === 'stripe' ? 'Tarjeta de Crédito' : 'Transferencia Bancaria'}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">${order.totalAmount}</p>
                  <p className={`text-xs font-semibold mt-2 px-3 py-1 rounded-full inline-block ${
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

                <ArrowRight className="text-muted-foreground group-hover:text-accent transition" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
