import { H1, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Button } from 'app/design/button'
import { VSpacer } from 'app/design/layout'

export function EmptyItem({ invite }: { invite: () => void }) {
    return (
        <View className="flex-col items-center justify-center">
            <Text className="mb-4 w-full text-lg">
                You do not have added any friends yet. {'\n'}
                Let us add them.
            </Text>
            <View className="max-w-fit">
                <Button text="Invite friends" onClick={invite} />
            </View>
        </View>
    )
}
