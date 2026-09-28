import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const reviews = pgTable(
  "reviews",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    nombre: varchar("nombre", { length: 80 }).notNull(),
    comentario: text("comentario").notNull(),
    rating: integer("rating").notNull(),
    productId: varchar("productId", { length: 120 }),
    status: varchar("status", { length: 20 })
      .notNull()
      .default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    statusIdx: index("reviews_status_idx").on(table.status),
    productIdx: index("reviews_product_idx").on(table.productId),
    createdAtIdx: index("reviews_created_at_idx").on(table.createdAt),
  }),
);

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;