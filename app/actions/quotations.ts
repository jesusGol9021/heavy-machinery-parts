'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { quotation, product } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getUserQuotations() {
  const userId = await getUserId()
  const quotations = await db
    .select()
    .from(quotation)
    .where(eq(quotation.userId, userId))
    .orderBy(desc(quotation.createdAt))
  
  return Promise.all(
    quotations.map(async (q) => {
      let prod = null
      if (q.productId) {
        const result = await db.select().from(product).where(eq(product.id, q.productId))
        prod = result[0]
      }
      return { ...q, product: prod }
    })
  )
}

export async function createQuotation(
  email: string,
  phone: string,
  message: string,
  productId?: number,
  quantity?: number
) {
  const userId = await getUserId()
  
  const [newQuotation] = await db
    .insert(quotation)
    .values({
      userId,
      email,
      phone,
      message,
      productId,
      quantity,
      status: 'pending',
    })
    .returning()
  
  revalidatePath('/quotations')
  return newQuotation
}

export async function updateQuotationStatus(id: number, status: string) {
  const userId = await getUserId()
  const q = await db.select().from(quotation).where(eq(quotation.id, id))
  
  if (!q[0] || q[0].userId !== userId) throw new Error('Unauthorized')
  
  await db.update(quotation).set({ status }).where(eq(quotation.id, id))
  revalidatePath('/quotations')
}
