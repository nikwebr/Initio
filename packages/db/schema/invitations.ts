import {
    varchar,
} from 'drizzle-orm/mysql-core'

import { mySqlTable } from './_table'
import { users } from './auth'
import { relations, sql } from 'drizzle-orm'
import { timestamp } from 'drizzle-orm/mysql-core'

export const invitations = mySqlTable('invitations', {
    code: varchar('code', { length: 255 }).notNull().primaryKey(),
    invitedByUser: varchar('invitedByUser', { length: 255 })
        .notNull()
        .references(() => users.id, {
            onDelete: 'cascade',
            onUpdate: 'cascade',
        }),
    createdAt: timestamp('created_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
})

export const invitationsRelations = relations(invitations, ({ one }) => ({
    invitedBy: one(users, {
        fields: [invitations.invitedByUser],
        references: [users.id],
    }),
}))
