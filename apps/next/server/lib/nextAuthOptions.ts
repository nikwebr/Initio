import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db, tableCreator } from 'db'
import DiscordProvider from 'next-auth/providers/discord'
import { Session, User } from 'next-auth'

export const authOptions = {
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 12 * 30 * 24 * 60 * 60, // 365 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
    adapter: DrizzleAdapter(db, tableCreator),
    providers: [
        DiscordProvider({
            clientId: process.env.AUTH_DISCORD_ID!,
            clientSecret: process.env.AUTH_DISCORD_SECRET!,
        })
    ],
    callbacks: {
        async session(param: SessionCallbackParam) {
            // Send properties to the client, like an access_token and user id from a provider.
            param.session.user.id = param.user.id
            return param.session
        },
    },
}

interface SessionCallbackParam {
    session: Session
    user: User
}
