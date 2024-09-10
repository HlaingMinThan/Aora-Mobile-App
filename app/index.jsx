import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

// https://www.nativewind.dev/quick-starts/expo
const index = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-3xl text-secondary-">index</Text>
            <Link href={'/(tab)/home'} style={{ color: "blue" }}>home</Link>
        </View>
    )
}

export default index

