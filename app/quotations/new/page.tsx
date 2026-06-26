import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import { QuotationForm } from '@/components/quotation-form'
import { getProducts } from '@/app/actions/products'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewQuotationPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <Link href="/quotations" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ArrowLeft size={20} /> Volver a Cotizaciones
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Nueva Cotización</h1>
            <p className="text-muted-foreground mb-8">
              Solicita una cotización personalizada. Nuestro equipo se pondrá en contacto pronto.
            </p>
            <QuotationForm products={products} userEmail={session.user.email} />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">¿Cómo funciona?</h3>
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="font-bold text-accent min-w-8">1.</span>
                  <span>Completa el formulario con tus datos y requerimientos</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-accent min-w-8">2.</span>
                  <span>Recibe una confirmación por correo electrónico</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-accent min-w-8">3.</span>
                  <span>Nuestro equipo analiza tu solicitud</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-accent min-w-8">4.</span>
                  <span>Recibirás una cotización personalizada en 24-48 horas</span>
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Ventajas de Cotización</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Precios especiales por volumen</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Asesoramiento técnico gratuito</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Envíos personalizados</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Opciones de financiamiento</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">¿Necesitas Ayuda?</h3>
              <p className="text-muted-foreground mb-4">
                Contacta a nuestro equipo de ventas directamente:
              </p>
              <p className="text-foreground font-semibold">📞 +1 (555) 123-4567</p>
              <p className="text-foreground font-semibold">📧 ventas@partshub.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
