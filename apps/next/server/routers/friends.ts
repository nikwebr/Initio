import { authorizedProcedure, router } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { deleteRelation, invite } from '../lib/friend'
import {getChecks} from "../lib/checks/check";
import {getUser} from "../lib/user";

export const friendsRouter = router({
    get: authorizedProcedure.query(async (opts) => {
        const result = await getUser(opts.ctx.userId!, true, true)
        if (!result) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
            })
        }
        return result.friends
    }),
    invite: authorizedProcedure.mutation(async (opts) => {
        const result = await invite(opts.ctx.userId!)
        if (!result) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
            })
        }
        return process.env.API_ENDPOINT + '/invite?code=' + result
    }),
    deleteFriend: authorizedProcedure
        .input(
            z.object({
                friendId: z.string(),
            }),
        )
        .mutation(async (opts) => {
            const result = await deleteRelation(
                opts.input.friendId,
                opts.ctx.userId!,
            )
            if (!result) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                })
            }
            return result
        }),
})
