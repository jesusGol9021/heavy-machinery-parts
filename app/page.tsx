import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap, Users, Truck, Shield, ArrowRight } from 'lucide-react'

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <Header session={session} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Repuestos de{' '}
              <span className="text-accent">Maquinaria Pesada</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tu tienda confiable para todos los repuestos de excavadoras, tractores, motoniveladoras y más.
              Entrega rápida, garantía certificada y precios competitivos.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/catalog">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary">
                  Ver Catálogo <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg" variant="outline">
                  Crear Cuenta
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap, label: 'Rápido', desc: 'Envíos en 24h' },
              { icon: Shield, label: 'Seguro', desc: '100% Garantizado' },
              { icon: Users, label: 'Soporte', desc: '24/7 Disponible' },
              { icon: Truck, label: 'Entrega', desc: 'Nationwide' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition"
              >
                <item.icon className="text-accent mb-3" size={28} />
                <h3 className="font-bold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/50 py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            ¿Por qué elegir PartsHub?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Catálogo Completo',
                description: 'Más de 1000 repuestos originales y certificados para todas las marcas',
              },
              {
                title: 'Precios Competitivos',
                description: 'Los mejores precios del mercado con descuentos por volumen',
              },
              {
                title: 'Expertos Disponibles',
                description: 'Equipo técnico listo para ayudarte a encontrar el repuesto correcto',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold mb-3 text-accent">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            ¿Necesitas ayuda?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Solicita una cotización personalizada para tus necesidades específicas.
            Nuestro equipo de expertos estará encantado de asistirte.
          </p>
          <Link href={session?.user ? '/quotations/new' : '/sign-up'}>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary">
              Solicitar Cotización
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
