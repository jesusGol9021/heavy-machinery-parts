'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { product, category } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getCategories() {
  return db.select().from(category)
}

export async function getProducts() {
  return db.select().from(product)
}

export async function getProductById(id: number) {
  const result = await db.select().from(product).where(eq(product.id, id))
  return result[0] || null
}

export async function getProductsByCategory(categoryId: number) {
  return db.select().from(product).where(eq(product.categoryId, categoryId))
}

export async function getCategoryById(id: number) {
  const result = await db.select().from(category).where(eq(category.id, id))
  return result[0] || null
}
