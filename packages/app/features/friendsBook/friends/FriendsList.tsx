import { View } from 'app/design/view'
import { trpc } from 'app/provider/trpc-client'
import { FlatList } from 'react-native'
import FriendsListItem from 'app/features/friendsBook/friends/FriendsListItem'
import { Skeleton } from 'moti/skeleton'
import { EmptyItem } from 'app/features/friendsBook/friends/EmptyItem'
import UserProfile from "app/lib/types/userProfile";

const FriendsList = ({ invite }: { invite: () => void }) => {
    const user = trpc.getUser.useQuery()

    const renderItem = ({ item }: { item: UserProfile }) => {
        return <FriendsListItem item={item} />
    }

    return (
        <View>
            <Skeleton colorMode="light" width={'100%'} show={user.isLoading}>
                <FlatList
                    // Saving reference to the `FlashList` instance to later trigger `prepareForLayoutAnimationRender` method.
                    numColumns={5}
                    // This prop is necessary to uniquely identify the elements in the list.
                    keyExtractor={(item: UserProfile) => {
                        return item.id
                    }}
                    scrollEnabled={false}
                    ListEmptyComponent={<EmptyItem invite={invite} />}
                    columnWrapperStyle={{
                        flexWrap: 'wrap',
                        flex: 1,
                        marginTop: 5,
                    }}
                    renderItem={renderItem}
                    data={user.data?.friends}
                    style={{
                        flexGrow: 0,
                    }}
                />
            </Skeleton>
        </View>
    )
}

export default FriendsList
