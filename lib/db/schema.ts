import { pgTable, text, timestamp, boolean, integer, serial, decimal } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  password: text('password'),
  role: text('role').notNull().default('customer'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  country: text('country'),
  postal_code: text('postal_code'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// --- App Tables ---------------------------------------------------------------

export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  sku: text('sku').notNull().unique(),
  categoryId: integer('categoryId').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull().default(0),
  image: text('image'),
  warranty: text('warranty'),
  weight: decimal('weight', { precision: 10, scale: 2 }),
  dimensions: text('dimensions'),
  compatibility: text('compatibility'),
  supplier: text('supplier'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const cartItem = pgTable('cart_item', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  productId: integer('productId').notNull(),
  quantity: integer('quantity').notNull().default(1),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const order = pgTable('order', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  status: text('status').notNull().default('pending'),
  paymentMethod: text('paymentMethod').notNull(),
  totalAmount: decimal('totalAmount', { precision: 10, scale: 2 }).notNull(),
  stripeSessionId: text('stripeSessionId'),
  shippingAddress: text('shippingAddress'),
  shippingCity: text('shippingCity'),
  shippingPostalCode: text('shippingPostalCode'),
  shippingCountry: text('shippingCountry'),
  notes: text('notes'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const orderItem = pgTable('order_item', {
  id: serial('id').primaryKey(),
  orderId: integer('orderId').notNull(),
  productId: integer('productId').notNull(),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const quotation = pgTable('quotation', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  productId: integer('productId'),
  quantity: integer('quantity'),
  message: text('message'),
  email: text('email').notNull(),
  phone: text('phone'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
