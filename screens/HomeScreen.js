import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'

import CustomListItem from '../componets/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler'


const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    const enterChat = (id, chatName) => {
        navigation.navigate('chat', { id, chatName })
    }

    useEffect(() => {
        const unsunscribe = db.collection('chats')
            .onSnapshot((snapshot) =>
                setChats(
                    snapshot.docs.map((doc) => (
                        {
                            id: doc.id,
                            data: doc.data()

                        }
                    ))
                )
            )


        return unsunscribe;
    }, [])

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerTitleStyle: {
                color: '#000'
            },
            headerTintColor: '#000',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity
                        onPress={signOut}
                        activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity
                        activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            navigation.navigate('AddChat')
                        }}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })

        console.log('chats are :', chats)

    })
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={chats}
                keyExtractor={item => item.id}
                renderItem={
                    ({ item }) => (
                        <CustomListItem chatName={item.data.chatName} id={item.id} enterChat={enterChat} />
                    )
                } />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
