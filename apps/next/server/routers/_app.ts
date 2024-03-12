import { authorizedProcedure, router } from '../trpc'
import { checksRouter } from './checks'
import { getUser } from '../lib/user'
import { TRPCError } from '@trpc/server'
import {friendsRouter} from "./friends";

export const appRouter = router({
    getUser: authorizedProcedure.query(async (opts) => {
        const result = await getUser(opts.ctx.userId!, true, true)
        if (!result) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
            })
        }
        return result
    }),
    checks: checksRouter,
    friends: friendsRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
