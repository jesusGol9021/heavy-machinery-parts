'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { cartItem, product } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getCart() {
  const userId = await getUserId()
  const items = await db.select().from(cartItem).where(eq(cartItem.userId, userId))
  
  const itemsWithProducts = await Promise.all(
    items.map(async (item) => {
      const prod = await db.select().from(product).where(eq(product.id, item.productId))
      return { ...item, product: prod[0] }
    })
  )
  
  return itemsWithProducts
}

export async function addToCart(productId: number, quantity: number) {
  const userId = await getUserId()
  
  const existing = await db
    .select()
    .from(cartItem)
    .where(and(eq(cartItem.userId, userId), eq(cartItem.productId, productId)))
  
  if (existing.length > 0) {
    await db
      .update(cartItem)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItem.id, existing[0].id))
  } else {
    await db.insert(cartItem).values({ userId, productId, quantity })
  }
  
  revalidatePath('/cart')
}

export async function removeFromCart(cartItemId: number) {
  const userId = await getUserId()
  const item = await db.select().from(cartItem).where(eq(cartItem.id, cartItemId))
  
  if (!item[0] || item[0].userId !== userId) throw new Error('Unauthorized')
  
  await db.delete(cartItem).where(eq(cartItem.id, cartItemId))
  revalidatePath('/cart')
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  const userId = await getUserId()
  const item = await db.select().from(cartItem).where(eq(cartItem.id, cartItemId))
  
  if (!item[0] || item[0].userId !== userId) throw new Error('Unauthorized')
  
  if (quantity <= 0) {
    await db.delete(cartItem).where(eq(cartItem.id, cartItemId))
  } else {
    await db.update(cartItem).set({ quantity }).where(eq(cartItem.id, cartItemId))
  }
  
  revalidatePath('/cart')
}

export async function clearCart() {
  const userId = await getUserId()
  await db.delete(cartItem).where(eq(cartItem.userId, userId))
  revalidatePath('/cart')
}
