import Check from '../types/check'
import { checks } from 'db/schema/checks'
import { db } from 'db'
import { and, eq } from 'drizzle-orm'

type CheckDB = typeof checks.$inferSelect

export async function addCheck(
    userId: string,
    hour: number,
    minute: number,
): Promise<string | undefined> {
    const timeString = hour + ':' + minute
    const eventId = (Math.random() + 1).toString(36).substring(7)

    await db.insert(checks).values({
        userId: userId,
        time: timeString,
        checkId: eventId,
    })

    return eventId
}

export async function removeCheck(checkId: string, userId: string) {
    const res = await db
        .delete(checks)
        .where(
            and(eq(checks.checkId, checkId), eq(checks.userId, userId)),
        )

    return res[0].affectedRows > 0
}

export async function modifyCheck(
    checkId: string,
    hour: number,
    minute: number,
    userId: string,
) {
    const timeString = hour + ':' + minute
    const res = await db
        .update(checks)
        .set({ time: timeString })
        .where(
            and(eq(checks.checkId, checkId), eq(checks.userId, userId)),
        )
    return res[0].affectedRows > 0
}

export async function getChecks(userId: string, sort?: boolean) {
    const result = await db.query.checks.findMany({
        where: eq(checks.userId, userId),
    })
    const checksRes = toChecks(result)

    if (!sort) {
        return checksRes
    }

    checksRes.sort(function (a, b) {
        if (a.hour < b.hour) {
            return -1
        } else if (a.hour == b.hour) {
            return a.minute - b.minute
        } else {
            return 1
        }
    })

    return checksRes
}

/**
 * Converts a DB object to corresponding lib type
 * @param check
 */
export function toCheck(check: CheckDB): Check {
    const time = toHourMinute(check.time)
    return {
        hour: time.hour,
        minute: time.minute,
        checkId: check.checkId,
        userId: check.userId
    }
}

export function toChecks(checks: CheckDB[]): Check[] {
    const results: Check[] = []
    for (const check of checks) {
        results.push(toCheck(check))
    }
    return results
}

/**
 * Converts a mysql time string to an object with time and minute
 * @param time mysql time string
 */
export function toHourMinute(time: string) {
    const a = time.split(':')
    const hour = Number(a[0])
    if (hour >= 24 || hour < 0) {
        throw new Error(errors.INVALID_ARGUMENTS, {
            cause: 'Time field holds an hour value < 0 or >= 24',
        })
    }
    return {
        hour: hour,
        minute: Number(a[1]),
    }
}
