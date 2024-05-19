import { H1, Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'
import { Row } from 'app/design/layout'
import {
    AnimatedLink,
    AnimatedPressable,
    Button,
    MotiPressable,
} from 'app/design/button'
import { useEffect, useState } from 'react'
import { PlusCircle } from '@nandorojo/heroicons/24/solid'
import { StyleSheet } from 'react-native'
import { InviteModal } from 'app/features/friendsBook/friends/InviteModal'
import FriendsList from 'app/features/friendsBook/friends/FriendsList'

const Icon = () => <PlusCircle className="h-14" />

export function Friends() {
    const [shareVisible, setShareVisible] = useState(false)

    const onShareClose = () => {
        setShareVisible(false)
    }

    return (
        <>
            <View className="w-full">
                <Row className="items-center justify-between">
                    <H1>Your friends</H1>
                    <AnimatedPressable onClick={() => setShareVisible(true)}>
                        <Icon />
                    </AnimatedPressable>
                </Row>
                <FriendsList invite={() => setShareVisible(true)} />
            </View>
            <InviteModal visible={shareVisible} onClose={onShareClose} />
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
