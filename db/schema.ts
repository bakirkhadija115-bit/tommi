import { pgTable, text, timestamp, serial, integer } from 'drizzle-orm/pg-core';

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  videoUrl: text('video_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  views: integer('views').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
