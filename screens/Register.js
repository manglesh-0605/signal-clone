import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image, Text } from 'react-native-elements'
import { auth } from '../firebase'

const Register = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    // to register a user in firebase---------------------------
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                console.log('User registed')
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL:
                        imageUrl ||
                        'https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
                })
            })
            .catch(err => alert(err.message))
    }

    //to set the options of the screen----------------
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigator])

    return (
        <KeyboardAvoidingView behavior='padding' style={Styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50 }}> Create a Signal account</Text>

            <View style={Styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    placeholder='Email'
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    placeholder='Profile picture URL (Optional)'
                    type="text"
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                />

            </View>
            <Button
                style={Styles.btn}
                title='Register'
                onPress={register} />

            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default Register

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff'
    },
    inputContainer: {
        width: 300

    },
    btn: {
        width: 200,
        marginTop: 10
    }
})
