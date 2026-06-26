import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import Link from 'next/link'
import { ArrowLeft, Eye, CheckCircle, Clock, XCircle } from 'lucide-react'

export default async function AdminQuotationsPage() {
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
            <h1 className="text-4xl font-bold text-foreground">Gestión de Cotizaciones</h1>
            <p className="text-muted-foreground">Responde solicitudes personalizadas</p>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Pendientes', count: 23, color: 'from-yellow-500 to-yellow-600' },
            { label: 'Aprobadas', count: 156, color: 'from-green-500 to-green-600' },
            { label: 'Rechazadas', count: 12, color: 'from-red-500 to-red-600' },
            { label: 'Totales', count: 191, color: 'from-accent to-orange-500' },
          ].map((item) => (
            <div key={item.label} className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-6`}>
              <p className="text-sm opacity-90">{item.label}</p>
              <p className="text-3xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>

        {/* Quotations Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Cotización #</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Cliente</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Producto</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Cantidad</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Fecha</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Estado</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 501, customer: 'Construcciones XYZ', product: 'Cilindro Hidráulico', qty: 10, date: '2026-06-25', status: 'pending' },
                  { id: 502, customer: 'Obras Viales S.A.', product: 'Cucharon Excavadora', qty: 5, date: '2026-06-24', status: 'approved' },
                  { id: 503, customer: 'Minería del Norte', product: 'Motor Diesel 6 Cyl', qty: 2, date: '2026-06-23', status: 'pending' },
                  { id: 504, customer: 'Flota Industrial', product: 'Transmisión Automática', qty: 3, date: '2026-06-22', status: 'approved' },
                  { id: 505, customer: 'Equipos Especializados', product: 'Zapata de Oruga', qty: 20, date: '2026-06-21', status: 'rejected' },
                ].map((quotation) => {
                  let Icon = Clock
                  let statusText = 'Pendiente'
                  let statusColor = 'text-yellow-600'
                  
                  if (quotation.status === 'approved') {
                    Icon = CheckCircle
                    statusText = 'Aprobada'
                    statusColor = 'text-green-600'
                  } else if (quotation.status === 'rejected') {
                    Icon = XCircle
                    statusText = 'Rechazada'
                    statusColor = 'text-red-600'
                  }

                  return (
                    <tr key={quotation.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="px-6 py-4 font-semibold text-foreground">#{quotation.id}</td>
                      <td className="px-6 py-4 text-muted-foreground">{quotation.customer}</td>
                      <td className="px-6 py-4 text-muted-foreground">{quotation.product}</td>
                      <td className="px-6 py-4 text-center font-semibold text-foreground">{quotation.qty}</td>
                      <td className="px-6 py-4 text-muted-foreground">{quotation.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <Icon size={18} className={statusColor} />
                          <span className={`text-sm font-semibold ${statusColor}`}>{statusText}</span>
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

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-4">Acciones Rápidas</h3>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition font-semibold">
              Aprobar Seleccionadas
            </button>
            <button className="px-6 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition font-semibold">
              Enviar Respuesta
            </button>
            <button className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition font-semibold">
              Exportar Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
