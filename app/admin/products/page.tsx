import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import Link from 'next/link'
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react'

export default async function AdminProductsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') redirect('/sign-in')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-accent hover:text-accent/80">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Gestión de Productos</h1>
              <p className="text-muted-foreground">Administra el catálogo completo</p>
            </div>
          </div>
          <Link href="/admin/products/new">
            <button className="flex items-center gap-2 bg-accent text-primary px-6 py-2 rounded-lg hover:bg-accent/90 transition font-semibold">
              <Plus size={20} /> Nuevo Producto
            </button>
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Producto</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">SKU</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Categoría</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Precio</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Stock</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'Cilindro Hidráulico', sku: 'CH-001', category: 'Excavadora', price: 450, stock: 12 },
                  { id: 2, name: 'Cucharon de Excavadora', sku: 'CE-002', category: 'Excavadora', price: 820, stock: 5 },
                  { id: 3, name: 'Zapata de Oruga', sku: 'ZO-003', category: 'Tractor', price: 320, stock: 18 },
                  { id: 4, name: 'Motor Diesel 6 Cyl', sku: 'MD-004', category: 'Motor', price: 3500, stock: 2 },
                  { id: 5, name: 'Transmisión Automática', sku: 'TA-005', category: 'Transmisión', price: 2800, stock: 3 },
                ].map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.sku}</td>
                    <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                    <td className="px-6 py-4 text-right font-bold text-accent">${product.price}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-muted-foreground">Mostrando 1-5 de 1250 productos</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-muted rounded-lg hover:bg-border transition text-foreground font-semibold">Anterior</button>
            <button className="px-4 py-2 bg-accent text-primary rounded-lg font-semibold">1</button>
            <button className="px-4 py-2 bg-muted rounded-lg hover:bg-border transition text-foreground font-semibold">2</button>
            <button className="px-4 py-2 bg-muted rounded-lg hover:bg-border transition text-foreground font-semibold">3</button>
            <button className="px-4 py-2 bg-muted rounded-lg hover:bg-border transition text-foreground font-semibold">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  )
}
