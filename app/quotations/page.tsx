import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import { getUserQuotations } from '@/app/actions/quotations'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function QuotationsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const quotations = await getUserQuotations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Mis Cotizaciones</h1>
            <p className="text-muted-foreground">Solicitudes y cotizaciones personalizadas</p>
          </div>
          <Link href="/quotations/new">
            <Button className="bg-accent hover:bg-accent/90 text-primary">
              <Plus size={18} className="mr-2" /> Nueva Cotización
            </Button>
          </Link>
        </div>

        {quotations.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-2xl text-muted-foreground mb-6">No tienes cotizaciones</p>
            <Link href="/quotations/new" className="inline-block bg-accent text-primary px-6 py-2 rounded-lg hover:bg-accent/90 transition">
              Solicitar Cotización
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {quotations.map((quote) => (
              <Link
                key={quote.id}
                href={`/quotations/${quote.id}`}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition flex justify-between items-center group"
              >
                <div>
                  <p className="font-bold text-lg text-foreground">Cotización #{quote.id}</p>
                  <p className="text-sm text-muted-foreground">{new Date(quote.createdAt).toLocaleDateString('es-ES')}</p>
                  {quote.product && (
                    <p className="text-sm text-accent mt-2">{quote.product.name} - Cantidad: {quote.quantity}</p>
                  )}
                </div>

                <div className="text-right">
                  <p className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${
                    quote.status === 'approved' ? 'bg-green-100 text-green-700' :
                    quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {quote.status === 'approved' ? 'Aprobada' :
                     quote.status === 'pending' ? 'Pendiente' :
                     'Rechazada'}
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
