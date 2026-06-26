import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import { getCart } from '@/app/actions/cart'
import { CartSummary } from '@/components/cart-summary'
import { CartItems } from '@/components/cart-items'

export default async function CartPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const cartItems = await getCart()
  const total = cartItems.reduce((sum, item) => {
    const price = item.product ? parseFloat(item.product.price.toString()) : 0
    return sum + price * item.quantity
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} cartCount={cartItems.length} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Tu Carrito</h1>
        <p className="text-muted-foreground mb-8">Revisa y confirma tu compra</p>

        {cartItems.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-2xl text-muted-foreground mb-6">Tu carrito está vacío</p>
            <a href="/catalog" className="inline-block bg-accent text-primary px-6 py-2 rounded-lg hover:bg-accent/90 transition">
              Ver Catálogo
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems items={cartItems} />
            </div>
            <CartSummary total={total} items={cartItems} />
          </div>
        )}
      </div>
    </div>
  )
}
