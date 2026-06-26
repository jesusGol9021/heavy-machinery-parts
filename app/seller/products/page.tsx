import { Header } from '@/components/header'
import { auth } from '@/lib/auth'
import { headers, redirect } from 'next/headers'
import Link from 'next/link'
import { Plus, Edit2, TrendingUp, Eye, ArrowLeft } from 'lucide-react'

export default async function SellerProductsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || (session.user.role !== 'seller' && session.user.role !== 'admin')) redirect('/sign-in')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <Header session={session} />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/seller" className="text-accent hover:text-accent/80">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Mis Productos</h1>
              <p className="text-muted-foreground">Gestiona tus productos en venta</p>
            </div>
          </div>
          <Link href="/seller/products/new">
            <button className="flex items-center gap-2 bg-accent text-primary px-6 py-2 rounded-lg hover:bg-accent/90 transition font-semibold">
              <Plus size={20} /> Nuevo Producto
            </button>
          </Link>
        </div>

        {/* Product Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Productos', value: '24', color: 'from-blue-500 to-blue-600' },
            { label: 'Activos', value: '20', color: 'from-green-500 to-green-600' },
            { label: 'Vistas Este Mes', value: '1,247', color: 'from-purple-500 to-purple-600' },
            { label: 'Ventas Este Mes', value: '89', color: 'from-accent to-orange-500' },
          ].map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-6`}>
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Products List */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Producto</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">SKU</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Precio</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Stock</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Vistas</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Ventas</th>
                  <th className="text-center px-6 py-4 font-semibold text-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'Cilindro Hidráulico', sku: 'CH-001', price: 450, stock: 12, views: 145, sales: 8 },
                  { id: 2, name: 'Cucharon de Excavadora', sku: 'CE-002', price: 820, stock: 5, views: 89, sales: 3 },
                  { id: 3, name: 'Zapata de Oruga', sku: 'ZO-003', price: 320, stock: 18, views: 234, sales: 12 },
                  { id: 4, name: 'Motor Diesel 6 Cyl', sku: 'MD-004', price: 3500, stock: 2, views: 456, sales: 1 },
                  { id: 5, name: 'Transmisión Automática', sku: 'TA-005', price: 2800, stock: 3, views: 312, sales: 2 },
                ].map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.sku}</td>
                    <td className="px-6 py-4 text-right font-bold text-accent">${product.price}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Eye size={16} className="text-muted-foreground" />
                        <span className="text-foreground">{product.views}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <TrendingUp size={16} className="text-accent" />
                        <span className="font-semibold text-foreground">{product.sales}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-accent hover:bg-accent/10 rounded-lg transition">
                          <Edit2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Consejos para Aumentar Ventas</h3>
          <ul className="grid md:grid-cols-3 gap-6">
            <li className="flex gap-3">
              <span className="text-accent text-2xl font-bold">1</span>
              <div>
                <p className="font-semibold text-foreground">Actualiza descripción</p>
                <p className="text-sm text-muted-foreground">Productos con descripciones detalladas se venden más</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent text-2xl font-bold">2</span>
              <div>
                <p className="font-semibold text-foreground">Mantén stock actualizado</p>
                <p className="text-sm text-muted-foreground">Los clientes prefieren productos disponibles</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent text-2xl font-bold">3</span>
              <div>
                <p className="font-semibold text-foreground">Ofertas especiales</p>
                <p className="text-sm text-muted-foreground">Promociona productos con descuentos</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
