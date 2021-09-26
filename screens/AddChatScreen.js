import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat',
            headerBackTitle: 'Chats'

        })
    }, [navigation])


    const createChat = async () => {
        await db
            .collection("chats")
            .add({
                chatName: input

            })
            .then(() => {
                console.log('mess added')
                navigation.goBack()
            })
            .catch((err) => alert(err))
    }


    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => { setInput(text) }}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name='wechat' type={'antdesing'} size={24} color='black' />
                } />

            <Button
                title='create a new chat'
                
                onPress={() => createChat()}
            />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        height: "100%",
    }
})
