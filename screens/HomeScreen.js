import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'

import CustomListItem from '../componets/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';


const HomeScreen = ({ navigation }) => {

    // const [chats, setChats] = useState([])

    // useEffect(() => {
    //     const unsunscribe = db.collection('chats').onSnapshot(snapshot =>
    //         setChats(
    //             snapshot.docs.map(doc => (
    //                 {
    //                     id: doc.id,
    //                     data: doc.data()

    //                 }
    //             )))
    //     )


    //     return unsunscribe;
    // }, [])

    
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
    })
    return (
        <SafeAreaView>
            <ScrollView>
                {/* {
                    chats.map(({ id, data: { chatName } }) => {
                        <CustomListItem key={id} id={id} chatName={chatName} />
                    })
                } */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
