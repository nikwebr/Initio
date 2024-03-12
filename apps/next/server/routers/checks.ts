import { authorizedProcedure, router } from '../trpc'
import {z} from 'zod'
import {
    addCheck,
    getChecks,
    modifyCheck,
    removeCheck,
} from '../lib/checks/check'
import { TRPCError } from '@trpc/server'

export const checksRouter = router({
    add: authorizedProcedure
        .input(
            z.object({
                hour: z.number(),
                minute: z.number(),
            }),
        )
        .output(
            z.string()
        )
        .mutation(async (opts) => {
            const result = await addCheck(
                opts.ctx.userId!,
                opts.input.hour,
                opts.input.minute,
            )
            if (!result) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                })
            }
            return result
        }),
    modify: authorizedProcedure
        .input(
            z.object({
                checkId: z.string(),
                hour: z.number(),
                minute: z.number(),
            }),
        )
        .output(
            z.boolean()
        )
        .mutation(async (opts) => {
            const result = await modifyCheck(
                opts.input.checkId,
                opts.input.hour,
                opts.input.minute,
                opts.ctx.userId,
            )
            if (!result) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                })
            }
            return result
        }),
    remove: authorizedProcedure
        .input(
            z.object({
                checkId: z.string(),
            }),
        )
        .output(
            z.boolean()
        )
        .mutation(async (opts) => {
            const result = await removeCheck(
                opts.input.checkId,
                opts.ctx.userId,
            )
            if (!result) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                })
            }
            return result
        }),
    get: authorizedProcedure
    .output((value: any) => {
        if(Array.isArray(value)) {
            return value
        }
        throw new Error('Greeting not found');
    } )
    .query(async (opts) => {
        const result = await getChecks(opts.ctx.userId!)
        if (!result) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
            })
        }
        return result
    }),
})
