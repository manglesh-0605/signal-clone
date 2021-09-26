import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../firebase'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            console.log(authUser)
            if (authUser) {
                navigation.replace('Home')
            } else {

            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(authUser => console.log('logged in as:', authUser.user.displayName))
            .catch(err => alert(err.message))
    }
    return (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
            <StatusBar style='light' />
            <Image
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png", }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputField}>
                <Input
                    placeholder='Email'
                    autoFocus
                    type="Email"
                    onChangeText={val => { setEmail(val) }}
                />
                <Input
                    placeholder='Password'
                    type="Password"
                    secureTextEntry
                    onChangeText={val => { setPassword(val) }}
                    onSubmitEditing={signIn} />
            </View>

            <Button style={styles.btn}
                title="Login"
                onPress={signIn} />
            <Button style={styles.btn}
                title="Register"
                type='outline'
                onPress={() => {
                    navigation.navigate('Register')
                }} />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputField: {
        width: 300,


    },
    btn: {
        width: 200,
        marginTop: 10

    }
})
