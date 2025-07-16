import { pgTable, integer, serial, varchar, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const blogs = pgTable('blogs', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    author: varchar({length: 255}).notNull(),
    title: varchar({length: 255}).notNull(),
    description: varchar({length: 255}).notNull(),
    content: varchar().notNull(),
    category: varchar({length: 255}).notNull(),
    img_link: varchar().notNull(),
    likes: integer().default(0).notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().defaultNow().$onUpdate(() => new Date()),
})

export const comments = pgTable('comments', {
    id: serial("id").primaryKey(),
    written_by: varchar({length:255}).notNull(),
    detail: varchar().notNull(),
    created_at: timestamp().notNull().defaultNow(),
})

export const comments_to_blogs = pgTable('comments_to_blogs',{
    blog_id: integer('blog_id').notNull(),
    comment_id: integer('comment_id').notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.blog_id, table.comment_id] }),
        primaryKey({ name: 'blog_comment_id_constraint', columns: [table.blog_id, table.comment_id] }),
])
