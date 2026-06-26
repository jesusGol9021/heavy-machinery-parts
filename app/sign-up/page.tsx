'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, User, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center font-bold text-primary text-lg">
            PH
          </div>
          <span className="text-2xl font-bold text-foreground">PartsHub</span>
        </Link>

        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Crear Cuenta</h1>
          <p className="text-muted-foreground mb-8">Únete a PartsHub y comienza a comprar repuestos de calidad</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Confirma tu contraseña"
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-1" />
              <span>Acepto los términos y condiciones de PartsHub</span>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent hover:bg-accent/90 text-primary rounded-lg font-semibold transition duration-200"
            >
              Crear Cuenta
            </button>

            {submitted && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-green-500">¡Cuenta creada!</p>
                  <p className="text-sm text-green-500/80">Se ha enviado un correo de confirmación a {email}</p>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-muted-foreground mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/sign-in" className="text-accent font-semibold hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
