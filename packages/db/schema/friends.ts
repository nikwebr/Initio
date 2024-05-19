import { relations, sql } from 'drizzle-orm'
import {
    timestamp,
    varchar,
    primaryKey,
} from 'drizzle-orm/mysql-core'

import { mySqlTable } from './_table'
import { users } from './auth'

export const friends = mySqlTable(
    'friends',
    {
        friendId1: varchar('friendId1', { length: 255 })
            .notNull()
            .references(() => users.id, {
                onDelete: 'cascade',
                onUpdate: 'cascade',
            }),
        friendId2: varchar('friendId2', { length: 255 })
            .notNull()
            .references(() => users.id, {
                onDelete: 'cascade',
                onUpdate: 'cascade',
            }),
        createdAt: timestamp('created_at')
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    },
    (table) => {
        return {
            pk: primaryKey({
                columns: [table.friendId1, table.friendId2],
            }),
        }
    },
)

export const friendsRelations = relations(friends, ({ one }) => ({
    friend1: one(users, {
        fields: [friends.friendId1],
        references: [users.id],
    }),
    friend2: one(users, {
        fields: [friends.friendId2],
        references: [users.id],
    }),
}))