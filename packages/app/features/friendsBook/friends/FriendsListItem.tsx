import React from 'react'
import { XMark } from '@nandorojo/heroicons/20/solid'
import { View } from 'app/design/view'
import { trpc } from 'app/provider/trpc-client'
import { StyledPressable } from 'app/design/button'
import { Text } from 'app/design/typography'
import UserProfile from "app/lib/types/userProfile";

const Icon = () => <XMark />

const renderItem = ({ item }: { item: UserProfile }) => {
    const deleteMutation = trpc.friends.deleteFriend.useMutation()
    const remove = () => {
        deleteMutation.mutate({
            friendId: item.id,
        })
    }

    return (
        <View className="m-2 flex-row items-center justify-around rounded-full bg-gray-200 p-1.5 pl-3">
            <Text>
                {item.name
                    ? item.name
                    : item.email}
            </Text>
            <StyledPressable
                onPress={remove}
                className={`
      ml-2 mr-2 rounded-full border border-gray-300 bg-white bg-opacity-30 p-2 font-semibold text-gray-800 shadow hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 active:ring-4
    `}
            >
                <Icon />
            </StyledPressable>
        </View>
    )
}

export default renderItem
