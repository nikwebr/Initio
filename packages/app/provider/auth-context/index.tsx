'use client'

import React from 'react'
import { CommonAuthContext } from 'app/provider/auth-context/types'
import { useSession, getSession } from 'next-auth/react'
import { signOut, signIn } from 'next-auth/react'
import { useRouter } from 'solito/navigation'
const AuthContext = React.createContext<CommonAuthContext | null>(null)

// This hook can be used to access the user info.
export function useAuth() {
    const value = React.useContext(AuthContext)
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useAuth must be wrapped in a <AuthProvider />')
        }
    }

    return value
}

export function AuthProvider(props: React.PropsWithChildren) {
    const router = useRouter()
    const { data: session, status, update,  } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace('/sign-in')
        },
    })

    const authValue = {
        signIn: async () => {
            await signIn()
            return true
        },
        signOut: async () => {
            await signOut()
            return true
        },
        isLoggedIn: status == "authenticated",
        isLoading: status === 'loading',
    }

    return (
        <AuthContext.Provider value={authValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
