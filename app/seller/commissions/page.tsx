import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import Link from 'next/link'
import { DollarSign, TrendingUp, CreditCard, ArrowLeft, Download } from 'lucide-react'

export default async function SellerCommissionsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || (session.user.role !== 'seller' && session.user.role !== 'admin')) redirect('/sign-in')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/seller" className="text-accent hover:text-accent/80">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Mis Comisiones</h1>
            <p className="text-muted-foreground">Histórico de comisiones y pagos</p>
          </div>
        </div>

        {/* Commission Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: DollarSign, label: 'Comisión Total', value: '$12,850', color: 'from-accent to-orange-500' },
            { icon: TrendingUp, label: 'Este Mes', value: '$2,850', color: 'from-green-500 to-green-600' },
            { icon: CreditCard, label: 'Pagado', value: '$10,000', color: 'from-blue-500 to-blue-600' },
            { icon: DollarSign, label: 'Pendiente', value: '$2,850', color: 'from-yellow-500 to-yellow-600' },
          ].map((item, i) => (
            <div key={i} className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-6`}>
              <item.icon size={32} className="mb-3 opacity-80" />
              <p className="text-sm opacity-90">{item.label}</p>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Commission Details Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-xl font-bold text-foreground">Detalles de Comisiones</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-accent border border-accent rounded-lg hover:bg-accent/10 transition font-semibold">
              <Download size={18} />
              Descargar Reporte
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Mes</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Ventas</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Comisión Base</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Bonificación</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Total</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: 'Junio 2026', sales: 28500, base: 2850, bonus: 285, status: 'pending' },
                  { month: 'Mayo 2026', sales: 23400, base: 2340, bonus: 234, status: 'paid' },
                  { month: 'Abril 2026', sales: 19800, base: 1980, bonus: 198, status: 'paid' },
                  { month: 'Marzo 2026', sales: 22650, base: 2265, bonus: 226, status: 'paid' },
                  { month: 'Febrero 2026', sales: 18900, base: 1890, bonus: 189, status: 'paid' },
                  { month: 'Enero 2026', sales: 16200, base: 1620, bonus: 162, status: 'paid' },
                ].map((row) => (
                  <tr key={row.month} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4 font-semibold text-foreground">{row.month}</td>
                    <td className="px-6 py-4 text-right text-foreground">${row.sales.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-accent">${row.base.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-green-600 font-semibold">+${row.bonus}</td>
                    <td className="px-6 py-4 text-right font-bold text-foreground">${(row.base + row.bonus).toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      {row.status === 'paid' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Pagado</span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">Pendiente</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Information */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Información de Pago</h3>
            <div className="space-y-4">
              <div className="p-4 bg-background border border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Próximo Pago</p>
                <p className="font-bold text-foreground text-lg">30 de Junio de 2026</p>
              </div>
              <div className="p-4 bg-background border border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Método de Pago</p>
                <p className="font-bold text-foreground">Transferencia Bancaria</p>
              </div>
              <div className="p-4 bg-background border border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Cuenta Bancaria</p>
                <p className="font-bold text-foreground">****1234</p>
              </div>
              <button className="w-full px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition font-semibold">
                Solicitar Pago Anticipado
              </button>
            </div>
          </div>

          {/* Commission Structure */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Estructura de Comisión</h3>
            <div className="space-y-4">
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-foreground">Comisión Base</p>
                  <span className="font-bold text-accent">10%</span>
                </div>
              </div>
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-foreground">Bonificación 0-20K</p>
                  <span className="font-bold text-accent">+1%</span>
                </div>
              </div>
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-foreground">Bonificación 20K-50K</p>
                  <span className="font-bold text-accent">+2%</span>
                </div>
              </div>
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-foreground">Bonificación &gt;50K</p>
                  <span className="font-bold text-accent">+3%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Las bonificaciones se pagan cuando alcanzas los objetivos de venta mensuales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
