import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
    let { query } = useLocalSearchParams();
    return (
        <SafeAreaView className="bg-primary h-full">
            <Text className="text-white">{query}</Text>
        </SafeAreaView>
    )
}

export default Search

