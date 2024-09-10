import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

// https://www.nativewind.dev/quick-starts/expo
const index = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-3xl">index</Text>
            <Link href={'/profile'} style={{ color: "blue" }}>Profile</Link>
        </View>
    )
}

export default index

const styles = StyleSheet.create({})