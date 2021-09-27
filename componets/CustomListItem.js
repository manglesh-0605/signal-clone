import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timeStamp', 'desc')
            .onSnapshot((snapshot) =>
                setChatMessages(snapshot.docs.map(doc => doc.data()))
            )
    })


    return (
        <ListItem
            key={id}
            bottomDivider
            style={styles.list}
            onPress={() => enterChat(id, chatName)}
        >
            <Avatar
                rounded
                source={{
                    uri:
                        chatMessages?.[0]?.photoURL || "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
                }} />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem;

const styles = StyleSheet.create({
    list: {
        paddingLeft: 5
    }
})
