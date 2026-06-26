'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="bg-sidebar text-sidebar-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-primary">
              PH
            </div>
            <span className="text-xl font-bold hidden md:inline">PartsHub</span>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="hover:text-accent transition">Home</Link>
            <Link href="/products" className="hover:text-accent transition">Productos</Link>
            <Link href="/contact" className="text-accent font-semibold">Contacto</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Contáctanos</h1>
        <p className="text-muted-foreground mb-12">Estamos aquí para ayudarte con cualquier pregunta sobre nuestros repuestos</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nombre</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Asunto</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mensaje</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Cuéntanos más..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent hover:bg-accent/90 text-primary rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Enviar Mensaje
              </button>
              {submitted && (
                <p className="text-green-500 text-sm font-semibold">¡Mensaje enviado exitosamente!</p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Información de Contacto</h2>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Phone className="text-accent mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground">Teléfono</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-muted-foreground">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Mail className="text-accent mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground">Email</h3>
                  <p className="text-muted-foreground">info@partshub.com</p>
                  <p className="text-muted-foreground">soporte@partshub.com</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-accent mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground">Ubicación</h3>
                  <p className="text-muted-foreground">123 Industrial Ave</p>
                  <p className="text-muted-foreground">Nueva York, NY 10001</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl p-6 border border-accent/30">
              <h3 className="font-bold text-foreground mb-3">Horario de Atención</h3>
              <p className="text-muted-foreground">Lunes - Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-muted-foreground">Sábado: 9:00 AM - 2:00 PM</p>
              <p className="text-muted-foreground">Domingo: Cerrado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
