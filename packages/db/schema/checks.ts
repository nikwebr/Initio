import {
    time,
    varchar,
    primaryKey,
} from 'drizzle-orm/mysql-core'

import { mySqlTable } from './_table'
import { users } from './auth'
import { relations, sql } from 'drizzle-orm'

export const checks = mySqlTable(
    'checks',
    {
        userId: varchar('userId', { length: 255 })
            .notNull()
            .references(() => users.id, {
                onDelete: 'cascade',
                onUpdate: 'cascade',
            }),
        time: time('time')
            .notNull()
            .default(sql`'00:00' CHECK (HOUR(time) < 24)`),
        checkId: varchar('id', { length: 255 }).notNull().unique(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.time] }),
        }
    },
)

export const checksRelations = relations(checks, ({ one }) => ({
    user: one(users, {
        fields: [checks.userId],
        references: [users.id],
    }),
}))
