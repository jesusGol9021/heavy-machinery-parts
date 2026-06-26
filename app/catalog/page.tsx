import { Header } from '@/components/header'
import { getProducts, getCategories } from '@/app/actions/products'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { ProductCard } from '@/components/product-card'
import { CategoryFilter } from '@/components/category-filter'

export default async function CatalogPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Catálogo de Repuestos</h1>
          <p className="text-muted-foreground">Explora nuestro amplio catálogo de repuestos para maquinaria pesada</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar con filtros */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6 text-foreground">Categorías</h2>
              <CategoryFilter categories={categories} />
            </div>
          </div>

          {/* Grid de productos */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
