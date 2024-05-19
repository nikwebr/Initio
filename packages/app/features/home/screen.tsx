'use client'
import {Screen, VSpacer} from 'app/design/layout'
import { useAuth } from 'app/provider/auth-context'

import { useRouter } from 'solito/navigation'
import {H1, Text} from "app/design/typography";
import {Logo} from "app/design/logo";
import {View} from "app/design/view";
import {Button} from "app/design/button";
import {TextLink} from "solito/link";
import {Image} from "react-native"

export function HomeScreen() {
    const router = useRouter()
    const { user, signOut } = useAuth()!

    return (
        <Screen width="max-w-xl">
            <View className="flex-1 items-center justify-center p-3">
                <Image src="https://www.kochschule.de/sites/default/files/images/kochwissen/440/banane.jpg"/>
                <Logo doAnimate={true} />
                <Text className="mb-4 text-center">{`A starter for a Next.js & Expo monorepo with shared UI components and logic, preconfigured tRPC and authentication, Drizzle & Solito.`}</Text>
                <VSpacer />
                <TextLink href="/friendsBook"><Text className="text-base font-semibold">📖 Open friends book</Text></TextLink>
            </View>
        </Screen>
    )
}
