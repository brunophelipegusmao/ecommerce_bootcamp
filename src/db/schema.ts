import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
});

export const categoryTable = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  products: many(productTable),
}));

export const productTable = pgTable("product", {
  id: uuid().primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productRelations = relations(productTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [productTable.categoryId],
    references: [categoryTable.id],
  }),
  variants: many(productVariantTable),
}));

// pode ser escrito da seguinte forma:
// export const productRelations = relations(productTable, (params) => {
//   return {
//     category: params.one(categoryTable, {
//       fields: [productTable.categoryId],
//       references: [categoryTable.id],
//     }),
//     variants: params.many(productVariantTable)
//   };
// });

export const productVariantTable = pgTable("product_variant", {
  id: uuid().primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  color: text().notNull(),
  priceInCents: integer("prince_in_cents").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productVariantsRelations = relations(productVariantTable, ({ one }) => ({
  product: one(productTable, {
    fields: [productVariantTable.productId],
    references: [productTable.id],
  })
}));

