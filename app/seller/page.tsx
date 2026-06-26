import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import Link from 'next/link'
import { TrendingUp, ShoppingCart, DollarSign, Users, BarChart3, Settings } from 'lucide-react'

export default async function SellerDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || (session.user.role !== 'seller' && session.user.role !== 'admin')) redirect('/sign-in')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Vendedor</h1>
          <p className="text-muted-foreground">Gestiona tus ventas y comisiones</p>
        </div>

        {/* KPIs */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: ShoppingCart, label: 'Ventas este mes', value: '124', color: 'from-blue-500 to-blue-600' },
            { icon: DollarSign, label: 'Ingresos', value: '$28.5K', color: 'from-green-500 to-green-600' },
            { icon: TrendingUp, label: 'Comisión ganada', value: '$2.85K', color: 'from-accent to-orange-500' },
            { icon: Users, label: 'Clientes', value: '312', color: 'from-purple-500 to-purple-600' },
          ].map((kpi, i) => (
            <div key={i} className={`bg-gradient-to-br ${kpi.color} text-white rounded-xl p-6 shadow-lg`}>
              <kpi.icon size={32} className="mb-3 opacity-80" />
              <p className="text-sm opacity-90">{kpi.label}</p>
              <p className="text-3xl font-bold">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Sales */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Ventas Recientes</h2>
            <div className="space-y-4">
              {[
                { id: 1, product: 'Cilindro Hidráulico', customer: 'Obras ABC', amount: 450, commission: 45 },
                { id: 2, product: 'Cucharon Excavadora', customer: 'Construcciones XYZ', amount: 820, commission: 82 },
                { id: 3, product: 'Zapata de Oruga', customer: 'Minería Sur', amount: 320, commission: 32 },
                { id: 4, product: 'Motor Diesel 6 Cyl', customer: 'Equipos Especializados', amount: 3500, commission: 350 },
                { id: 5, product: 'Transmisión Automática', customer: 'Flota Industrial', amount: 2800, commission: 280 },
              ].map((sale) => (
                <div key={sale.id} className="p-4 bg-background border border-border rounded-lg flex justify-between items-center hover:bg-muted/50 transition">
                  <div>
                    <p className="font-semibold text-foreground">{sale.product}</p>
                    <p className="text-sm text-muted-foreground">{sale.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">${sale.amount}</p>
                    <p className="text-sm text-green-600">Com: ${sale.commission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-8">
            {/* Monthly Target */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="font-bold text-foreground mb-4">Meta Mensual</h3>
              <div className="space-y-2">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-bold text-foreground">68%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-accent to-orange-500 h-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">$20,500 / $30,000</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-xl p-8">
              <h3 className="font-bold text-foreground mb-4">Acciones Rápidas</h3>
              <div className="space-y-2">
                <Link href="/seller/products" className="block px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition font-semibold text-center">
                  Mis Productos
                </Link>
                <Link href="/seller/commissions" className="block px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition font-semibold text-center">
                  Ver Comisiones
                </Link>
                <Link href="/seller/settings" className="block px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition font-semibold text-center">
                  Configuración
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 size={24} className="text-accent" />
              Ventas por Mes
            </h3>
            <div className="space-y-4">
              {[
                { month: 'Enero', sales: 45, bar: 30 },
                { month: 'Febrero', sales: 52, bar: 35 },
                { month: 'Marzo', sales: 68, bar: 45 },
                { month: 'Abril', sales: 75, bar: 50 },
                { month: 'Mayo', sales: 92, bar: 61 },
                { month: 'Junio', sales: 124, bar: 82 },
              ].map((item) => (
                <div key={item.month} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-muted-foreground">{item.month}</span>
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-accent to-orange-500 h-full"
                      style={{ width: `${item.bar}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-right font-semibold text-foreground">{item.sales}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Commission Details */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <DollarSign size={24} className="text-accent" />
              Detalles de Comisión
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-background border border-border rounded-lg">
                <span className="text-muted-foreground">Comisión Junio</span>
                <span className="font-bold text-foreground">$2,850</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background border border-border rounded-lg">
                <span className="text-muted-foreground">Bonificación Rendimiento</span>
                <span className="font-bold text-green-600">+$285</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background border border-border rounded-lg">
                <span className="text-muted-foreground">Total Mes</span>
                <span className="font-bold text-accent text-lg">$3,135</span>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground mb-2">Próximo Pago: 30 de Junio</p>
                <button className="w-full px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition font-semibold">
                  Solicitar Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
