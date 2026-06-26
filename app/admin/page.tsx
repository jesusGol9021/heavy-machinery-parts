import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import Link from 'next/link'
import { BarChart3, Package, ShoppingCart, FileText, Settings } from 'lucide-react'

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') redirect('/sign-in')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestión completa de la plataforma</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {[
            { icon: Package, label: 'Productos', href: '/admin/products', count: '1250' },
            { icon: ShoppingCart, label: 'Órdenes', href: '/admin/orders', count: '842' },
            { icon: FileText, label: 'Cotizaciones', href: '/admin/quotations', count: '156' },
            { icon: BarChart3, label: 'Ventas', href: '/admin/sales', count: '$45.2K' },
            { icon: Settings, label: 'Configuración', href: '/admin/settings', count: '-' },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer h-full">
                <item.icon size={32} className="text-accent mb-3" />
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{item.count}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Órdenes Recientes</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 bg-background border border-border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">Orden #{100 + i}</p>
                    <p className="text-sm text-muted-foreground">Cliente #{i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">$1,250.00</p>
                    <p className="text-xs text-green-600 font-semibold">Completada</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/orders" className="inline-block mt-6 text-accent hover:text-accent/80 font-semibold">
              Ver todas →
            </Link>
          </div>

          {/* Recent Quotations */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Cotizaciones Pendientes</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 bg-background border border-border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">Cotización #{50 + i}</p>
                    <p className="text-sm text-muted-foreground">Cliente solicita respuesta</p>
                  </div>
                  <p className="text-xs text-yellow-600 font-semibold">Pendiente</p>
                </div>
              ))}
            </div>
            <Link href="/admin/quotations" className="inline-block mt-6 text-accent hover:text-accent/80 font-semibold">
              Ver todas →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Acciones Rápidas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/admin/products/new" className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition font-semibold text-center">
              Agregar Producto
            </Link>
            <Link href="/admin/categories" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold text-center">
              Gestionar Categorías
            </Link>
            <Link href="/admin/reports" className="px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition font-semibold text-center">
              Reportes
            </Link>
            <Link href="/admin/settings" className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition font-semibold text-center">
              Configuración
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
