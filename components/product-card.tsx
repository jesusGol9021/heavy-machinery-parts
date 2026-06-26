'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/app/actions/cart'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ProductCard({ product, index }: { product: any; index: number }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await addToCart(product.id, 1)
      router.refresh()
    } catch (err) {
      console.error('Error adding to cart:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const price = parseFloat(product.price.toString())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/product/${product.id}`}>
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition h-full flex flex-col">
          {/* Image Placeholder */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 aspect-square flex items-center justify-center text-5xl">
            ⚙️
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{product.description}</p>

            {/* SKU and Stock */}
            <div className="flex justify-between text-xs mb-4">
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded">{product.sku}</span>
              <span className={`px-2 py-1 rounded font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-2xl font-bold text-accent">${price.toFixed(2)}</span>
            </div>

            {/* Warranty */}
            {product.warranty && (
              <p className="text-xs text-muted-foreground mb-4">Garantía: {product.warranty}</p>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <Button
                size="sm"
                className="flex-1 bg-accent hover:bg-accent/90 text-primary"
                onClick={handleAddToCart}
                disabled={isLoading || product.stock === 0}
              >
                <ShoppingCart size={16} className="mr-1" />
                {isLoading ? 'Agregando...' : 'Agregar'}
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Info size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
