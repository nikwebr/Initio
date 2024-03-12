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
        userId: varchar('userId', { length: 255 })
            .notNull()
            .references(() => users.id, {
                onDelete: 'cascade',
                onUpdate: 'cascade',
            }),
        friendId: varchar('invitedUserId', { length: 255 })
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
                columns: [table.userId, table.friendId],
            }),
        }
    },
)

export const friendsRelations = relations(friends, ({ one }) => ({
    friend: one(users, {
        fields: [friends.friendId],
        references: [users.id],
        relationName: 'friend',
    }),
    user: one(users, {
        fields: [friends.userId],
        references: [users.id],
        relationName: 'user',
    }),
}))
