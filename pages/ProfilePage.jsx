import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {getToken, getSession, getMe} from '../client'
import { WebView } from 'react-native-webview';
import setUser from '../store/actions';


const Profile = ({navigation}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [token, setToken] = useState("")

    useEffect(() => {
        if (!user.session) {
            getToken().then((token) => {
                setToken(token)
            })
        }
    }, [])

    if (token !== "") {
        return (
            <WebView source={{uri:`https://www.themoviedb.org/authenticate/${token}?redirect_to=https://nirah.tech/approvedconnection`}} onNavigationStateChange={(e) => {
                if (e.url.startsWith("https://nirah.tech/approvedconnection")) {
                    getSession(token).then(session => {
                        getMe(session).then(user => {
                            alert("success")
                           dispatch(setUser({...user, session}))
                           navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });                        })
                    })
                }
            }} />
        )
    }

    if (!user.session) {
        return (
            <View>
                <Text>Loggin you in</Text>
            </View>
        )
    }

    return (
        <View>
            <Text>You are now logged in as {user.username}</Text>
        </View>
    )
}

export default Profile