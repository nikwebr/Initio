import { H1, P } from 'app/design/typography'
import { View } from 'app/design/view'

import { useAuth } from 'app/provider/auth-context'
import { ActivityIndicator } from 'react-native'
import { Button } from 'app/design/button'

import { Logo } from 'app/design/logo'

export function SignInScreen() {
    const { signIn, isLoading, isLoggedIn } = useAuth()!

    if (isLoading && isLoggedIn) {
        return <ActivityIndicator />
    }

    return (
        <View className="bg-secondary flex-1 items-center justify-center p-3">
            <Logo doAnimate={true} />
            <View className="max-w-xl">
                <H1 className="mb-0 text-center text-lg">
                    Hello, stranger! Tell us who you are.
                </H1>
                <P className="mt-3 text-center text-lg">
                    You must log in to use the app. {'\n'}Log in to an existing account or register.
                </P>
            </View>
            <Button text="Proceed" onClick={signIn} />
        </View>
    )
}
