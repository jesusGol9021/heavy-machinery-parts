'use client'

import { removeFromCart, updateCartItemQuantity } from '@/app/actions/cart'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function CartItems({ items }: { items: any[] }) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  const handleRemove = async (id: number) => {
    setIsUpdating(id)
    try {
      await removeFromCart(id)
      router.refresh()
    } catch (err) {
      console.error('Error removing item:', err)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setIsUpdating(id)
    try {
      await updateCartItemQuantity(id, newQuantity)
      router.refresh()
    } catch (err) {
      console.error('Error updating quantity:', err)
    } finally {
      setIsUpdating(null)
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const price = item.product ? parseFloat(item.product.price.toString()) : 0
        const itemTotal = price * item.quantity

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 flex gap-6"
          >
            {/* Image */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg w-24 h-24 flex items-center justify-center text-3xl flex-shrink-0">
              ⚙️
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground">{item.product?.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item.product?.sku}</p>
              <p className="text-lg font-bold text-accent">${price.toFixed(2)}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 bg-muted rounded-lg p-3">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={isUpdating === item.id}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Minus size={18} />
              </button>
              <span className="text-foreground font-semibold w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                disabled={isUpdating === item.id}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Total */}
            <div className="text-right flex flex-col justify-between">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-foreground">${itemTotal.toFixed(2)}</p>
            </div>

            {/* Remove */}
            <button
              onClick={() => handleRemove(item.id)}
              disabled={isUpdating === item.id}
              className="text-red-500 hover:text-red-700 transition p-2"
            >
              <Trash2 size={20} />
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}
