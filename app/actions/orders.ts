'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { order, orderItem, cartItem, product } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getUserOrders() {
  const userId = await getUserId()
  return db
    .select()
    .from(order)
    .where(eq(order.userId, userId))
    .orderBy(desc(order.createdAt))
}

export async function getOrderById(id: number) {
  const userId = await getUserId()
  const ord = await db
    .select()
    .from(order)
    .where(and(eq(order.id, id), eq(order.userId, userId)))
  
  if (!ord[0]) throw new Error('Order not found')
  
  const items = await db.select().from(orderItem).where(eq(orderItem.orderId, id))
  const itemsWithProducts = await Promise.all(
    items.map(async (item) => {
      const prod = await db.select().from(product).where(eq(product.id, item.productId))
      return { ...item, product: prod[0] }
    })
  )
  
  return { ...ord[0], items: itemsWithProducts }
}

export async function createOrder(
  paymentMethod: string,
  shippingAddress: string,
  shippingCity: string,
  shippingPostalCode: string,
  shippingCountry: string,
  stripeSessionId?: string,
  notes?: string
) {
  const userId = await getUserId()
  
  const cartItems = await db
    .select()
    .from(cartItem)
    .where(eq(cartItem.userId, userId))
  
  if (cartItems.length === 0) throw new Error('Cart is empty')
  
  let totalAmount = 0
  const orderItemsData = await Promise.all(
    cartItems.map(async (item) => {
      const prod = await db.select().from(product).where(eq(product.id, item.productId))
      const price = prod[0] ? parseFloat(prod[0].price.toString()) : 0
      totalAmount += price * item.quantity
      return { productId: item.productId, quantity: item.quantity, price }
    })
  )
  
  const [newOrder] = await db
    .insert(order)
    .values({
      userId,
      status: paymentMethod === 'stripe' ? 'pending' : 'pending_payment',
      paymentMethod,
      totalAmount: totalAmount.toString(),
      shippingAddress,
      shippingCity,
      shippingPostalCode,
      shippingCountry,
      stripeSessionId,
      notes,
    })
    .returning()
  
  for (const item of orderItemsData) {
    await db.insert(orderItem).values({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price.toString(),
    })
  }
  
  await db.delete(cartItem).where(eq(cartItem.userId, userId))
  revalidatePath('/orders')
  
  return newOrder
}

export async function updateOrderStatus(id: number, status: string) {
  const userId = await getUserId()
  const ord = await db.select().from(order).where(and(eq(order.id, id), eq(order.userId, userId)))
  
  if (!ord[0]) throw new Error('Order not found')
  
  await db.update(order).set({ status }).where(eq(order.id, id))
  revalidatePath('/orders')
}
