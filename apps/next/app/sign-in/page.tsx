'use client'

import { useAuth } from 'app/provider/auth-context'
import { SignInScreen } from 'app/features/signIn/screen'
import { useRouter } from 'solito/navigation'

export default function SignIn() {
    const { isLoggedIn } = useAuth()!
    const router = useRouter()
    if(isLoggedIn) {
        router.replace("/");
    }
        return <SignInScreen />
}
