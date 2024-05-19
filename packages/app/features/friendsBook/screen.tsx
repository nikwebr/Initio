'use client'
import {H1, Text} from 'app/design/typography'
import { View } from 'app/design/view'

import ChecksList from 'app/features/friendsBook/checks/ChecksList'
import { Screen, VSpacer } from 'app/design/layout'
import { Friends } from 'app/features/friendsBook/friends/Friends'
import {MotiPressable} from "app/design/button";
import {useAuth} from "app/provider/auth-context";
import {BackButton} from "app/design/backbutton/backbutton";
import {trpc} from "app/provider/trpc-client";

export function FriendsBookScreen() {
    const { signOut } = useAuth()!
    const user = trpc.getUser.useQuery()
    return (
        <Screen width="max-w-2xl">
            <View className="w-full">
                <BackButton />

                <Friends />

                <VSpacer />

                <H1>Some random date pickers</H1>
                <ChecksList />
                <Text className="mt-2 text-base">{`Why datepickers? We use different pickers for Expo and Next.js. This example shows how to write code for different platforms`}</Text>
                <VSpacer />

                <View className="center items-center">
                    <MotiPressable onPress={() => signOut()}><Text className="text-base font-semibold">🔐 {user && user.data ? user.data.name : ""} - Sign out</Text></MotiPressable>
                </View>


            </View>
        </Screen>
    )
}
