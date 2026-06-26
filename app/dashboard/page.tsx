import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import { getUserOrders } from '@/app/actions/orders'
import { getUserQuotations } from '@/app/actions/quotations'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, FileText, Settings, MessageSquare } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const orders = await getUserOrders()
  const quotations = await getUserQuotations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Bienvenido, {session.user.name || 'Usuario'}
          </h1>
          <p className="text-muted-foreground">Gestiona tus compras y cotizaciones</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: ShoppingBag, label: 'Órdenes', value: orders.length, color: 'from-blue-500 to-blue-600' },
            { icon: FileText, label: 'Cotizaciones', value: quotations.length, color: 'from-purple-500 to-purple-600' },
            { icon: MessageSquare, label: 'Pendientes', value: quotations.filter(q => q.status === 'pending').length, color: 'from-orange-500 to-orange-600' },
            { icon: Settings, label: 'Cuenta', value: 'Activa', color: 'from-green-500 to-green-600' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <stat.icon size={32} className="mb-3 opacity-80" />
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Orders and Quotations */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Órdenes Recientes</h2>
            {orders.length === 0 ? (
              <p className="text-muted-foreground">No has realizado compras aún</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="p-4 bg-background border border-border rounded-lg hover:bg-muted transition flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-foreground">Orden #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">${order.totalAmount}</p>
                      <p className={`text-xs font-semibold ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.status === 'completed' ? 'Completada' : 'Pendiente'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/orders"
              className="inline-block mt-6 text-accent hover:text-accent/80 font-semibold"
            >
              Ver todas las órdenes →
            </Link>
          </div>

          {/* Recent Quotations */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Cotizaciones</h2>
            {quotations.length === 0 ? (
              <p className="text-muted-foreground">No has solicitado cotizaciones aún</p>
            ) : (
              <div className="space-y-4">
                {quotations.slice(0, 5).map((quote) => (
                  <Link
                    key={quote.id}
                    href={`/quotations/${quote.id}`}
                    className="p-4 bg-background border border-border rounded-lg hover:bg-muted transition flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-foreground">Cotización #{quote.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(quote.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                    <p className={`text-xs font-semibold ${quote.status === 'approved' ? 'text-green-600' : quote.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {quote.status === 'approved' ? 'Aprobada' : quote.status === 'pending' ? 'Pendiente' : 'Rechazada'}
                    </p>
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/quotations"
              className="inline-block mt-6 text-accent hover:text-accent/80 font-semibold"
            >
              Ver todas las cotizaciones →
            </Link>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-12 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Información de Cuenta</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground text-sm">Nombre</p>
              <p className="text-lg font-semibold text-foreground">{session.user.name || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="text-lg font-semibold text-foreground">{session.user.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Teléfono</p>
              <p className="text-lg font-semibold text-foreground">{session.user.phone || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Rol</p>
              <p className="text-lg font-semibold text-foreground capitalize">{session.user.role}</p>
            </div>
          </div>
          <Link
            href="/settings"
            className="inline-block mt-6 px-6 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition font-semibold"
          >
            Editar Perfil
          </Link>
        </div>
      </div>
    </div>
  )
}
