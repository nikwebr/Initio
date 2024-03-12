import User from './types/user'
import { eq } from 'drizzle-orm'
import { toChecks } from './checks/check'
import { db } from 'db'
import { users } from 'db/schema/auth'
import {toFriends} from "./friend";

type UserDB = typeof users.$inferSelect

export async function getUser(
    userId: string,
    withChecks?: boolean,
    withFriends?: boolean
) {
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            checks: !withChecks ? undefined : true,
            friends: !withFriends ? undefined : { with: { friend: true } },
        },
    })

    if (user) {
        const returnUser: User = {
            ...toUser(user),
            checks: !withChecks ? undefined : toChecks(user.checks),
            // @ts-ignore
            friends: !withFriends ? undefined : toFriends(user.friends),
        }

        return returnUser
    }

    return undefined
}

/**
 * Converts a DB object to corresponding lib type
 * @param user
 */
export function toUser(user: UserDB): User {
    return {
        ...user,
        name: user.name ?? undefined,
        emailVerified: user.emailVerified != null,
        image: user.image ?? undefined,
        checks: undefined,
        friends: undefined,
    }
}
