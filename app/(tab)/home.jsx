import { Text, View } from 'react-native'
import React from 'react'

const home = () => {
    return (
        <View>
            <Text>{process.env.EXPO_PUBLIC_APP_BACKEND}</Text>
        </View>
    )
}

export default home

