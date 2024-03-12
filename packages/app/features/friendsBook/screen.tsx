'use client'
import {H1, Text} from 'app/design/typography'
import { View } from 'app/design/view'

import ChecksList from 'app/features/friendsBook/checks/ChecksList'
import { Screen, VSpacer } from 'app/design/layout'
import { Friends } from 'app/features/friendsBook/friends/Friends'
import {TextLink} from "solito/link";
import FriendsList from "app/features/friendsBook/friends/FriendsList";

export function FriendsBookScreen() {
    return (
        <Screen width="max-w-2xl">
            <View className="w-full">
                <TextLink href="/"><Text className="text-base font-semibold">👈 Go back</Text></TextLink>

                <Friends />

                <VSpacer />

                <H1>Some random date pickers</H1>
                <ChecksList />
                <Text className="mt-2 text-base">{`Why datepickers? We use different pickers for Expo and Next.js. This example shows how to write code for different platforms`}</Text>



            </View>
        </Screen>
    )
}
