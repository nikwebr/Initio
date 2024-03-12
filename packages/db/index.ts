// @ts-ignore
import mysql from 'mysql2/promise'
import {
    drizzle,
    MySql2PreparedQueryHKT,
    MySql2QueryResultHKT,
    MySqlDatabase,
} from 'drizzle-orm/mysql2'

import * as auth from './schema/auth'
import * as checks from './schema/checks'
import * as friends from './schema/friends'
import * as oauthserver from './schema/oauthserver'
import * as invitations from './schema/invitations'

export const schema = {
    ...auth,
    ...checks,
    ...friends,
    ...invitations,
    ...oauthserver,
}

export { mySqlTable as tableCreator } from './schema/_table'

export * from 'drizzle-orm'

// Fix for "sorry, too many clients already" from:
// https://www.answeroverflow.com/m/1146224610002600067

declare global {
    // eslint-disable-next-line no-var -- only var works here
    var db:
        | MySqlDatabase<
              MySql2QueryResultHKT,
              MySql2PreparedQueryHKT,
              typeof schema
          >
        | undefined
}

let db: MySqlDatabase<
    MySql2QueryResultHKT,
    MySql2PreparedQueryHKT,
    typeof schema
>
let poolConnection: mysql.Pool
if (process.env.NODE_ENV === 'production') {
    if (process.env.DATABASE_URL) {
        poolConnection = mysql.createPool({
            uri: process.env.DATABASE_URL,
        })
    } else {
        poolConnection = mysql.createPool({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE,
            password: process.env.DATABASE_PASSWORD,
        })
    }

    db = drizzle(poolConnection, { schema: schema, mode: 'default' })
} else {
    if (!global.db) {
        if (process.env.DATABASE_URL) {
            poolConnection = mysql.createPool({
                uri: process.env.DATABASE_URL,
            })
        } else {
            poolConnection = mysql.createPool({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                database: process.env.DATABASE,
                password: process.env.DATABASE_PASSWORD,
            })
        }
        global.db = drizzle(poolConnection, {
            schema: schema,
            mode: 'default',
            logger: undefined /*{

                logQuery: (query) => {
                    // to remove quotes on query string, to make it more readable
                    console.log({ query: query.replace(/\"/g, '') })
                },


            },*/,
        })
    }
    db = global.db
}

type DbInstance = typeof db

export { db }
export type { DbInstance }
