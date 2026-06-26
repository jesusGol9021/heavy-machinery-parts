import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import Link from 'next/link'
import { ArrowLeft, Eye, CheckCircle, Clock } from 'lucide-react'

export default async function AdminOrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') redirect('/sign-in')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-accent hover:text-accent/80">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Gestión de Órdenes</h1>
            <p className="text-muted-foreground">Supervisa todas las compras</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Estado</label>
              <select className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground">
                <option>Todos</option>
                <option>Completada</option>
                <option>Pendiente</option>
                <option>Cancelada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Fecha Desde</label>
              <input type="date" className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Fecha Hasta</label>
              <input type="date" className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground" />
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition font-semibold">
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Orden #</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Cliente</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Fecha</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Monto</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Estado</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1001, customer: 'Juan García', date: '2026-06-25', amount: 2450, status: 'completed', icon: CheckCircle },
                  { id: 1002, customer: 'María López', date: '2026-06-24', amount: 1850, status: 'pending', icon: Clock },
                  { id: 1003, customer: 'Carlos Rodríguez', date: '2026-06-23', amount: 5200, status: 'completed', icon: CheckCircle },
                  { id: 1004, customer: 'Ana Martínez', date: '2026-06-22', amount: 3100, status: 'pending', icon: Clock },
                  { id: 1005, customer: 'Roberto Díaz', date: '2026-06-21', amount: 4500, status: 'completed', icon: CheckCircle },
                ].map((order) => {
                  const Icon = order.icon
                  return (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="px-6 py-4 font-semibold text-foreground">#{order.id}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.customer}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                      <td className="px-6 py-4 text-right font-bold text-accent">${order.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <Icon size={18} className={order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'} />
                          <span className={`text-sm font-semibold ${
                            order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {order.status === 'completed' ? 'Completada' : 'Pendiente'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button className="p-2 text-accent hover:bg-accent/10 rounded-lg transition">
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
            <p className="text-sm opacity-90">Órdenes Completadas</p>
            <p className="text-3xl font-bold">842</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6">
            <p className="text-sm opacity-90">Órdenes Pendientes</p>
            <p className="text-3xl font-bold">23</p>
          </div>
          <div className="bg-gradient-to-br from-accent to-orange-500 text-white rounded-xl p-6">
            <p className="text-sm opacity-90">Ingresos Totales</p>
            <p className="text-3xl font-bold">$45.2K</p>
          </div>
        </div>
      </div>
    </div>
  )
}
