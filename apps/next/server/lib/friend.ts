import { toUser } from './user'
import type { users } from 'db/schema/auth'
import { generate } from 'randomstring'
import { db } from 'db'
import { invitations } from 'db/schema/invitations'
import User from './types/user'
import { and, eq } from 'drizzle-orm'
import {friends} from "db/schema/friends";

type UserDB = typeof users.$inferSelect
type FriendDB = typeof friends.$inferSelect & {
    friend: UserDB
}

const INVITATION_EXPIRATION_DAYS = 2

/**
 * Returns the invitation code
 * @param guardedUser - user id
 */
export async function invite(userId: string) {
    for (let i = 0; i < 10; i++) {
        const code = generate({
            readable: true,
        })
        const res = await db.insert(invitations).values({
            code: code,
            invitedByUser: userId,
        })
        if (res[0].affectedRows > 0) {
            return code
        }
    }
    return undefined
}

export async function acceptInvitation(code: string, friendId: string) {
    const invitation = await db.query.invitations.findFirst({
        where: eq(invitations.code, code),
    })

    if (!invitation) {
        return false
    }

    const expDate = invitation.createdAt
    expDate.setUTCDate(expDate.getUTCDate() + INVITATION_EXPIRATION_DAYS)

    if (new Date() > expDate) {
        return false
    }

    const insertRes = await db.insert(friends).values({
        userId: invitation.invitedByUser,
        friendId: friendId
    })

    if (insertRes[0].affectedRows <= 0) {
        return false
    }

    const deleteRes = await db
        .delete(invitations)
        .where(eq(invitations.code, code))

    return insertRes[0].affectedRows > 0
}

export async function deleteRelation(friendId: string, userId: string) {
    const deleteRes = await db
        .delete(friends)
        .where(
            and(
                eq(friends.userId, userId),
                eq(friends.friendId, friendId),
            ),
        )
    return deleteRes[0].affectedRows > 0
}


/**
 * Converts a DB object to corresponding lib type
 * @param guard
 */
export function toFriend(friend: FriendDB): User {
    return toUser(friend.friend)
}
export function toFriends(friends: FriendDB[]): User[] {
    const results: User[] = []
    for (const friend of friends) {
        results.push(toFriend(friend))
    }
    return results
}
