import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';

const SearchInput = ({ initialSearch }) => {

    let [query, setQuery] = useState(initialSearch || "");
    let pathname = usePathname();

    let searchHandler = () => {
        if (!query) return Alert.alert("please enter something to search...");
        if (pathname.startsWith('/search')) {
            router.setParams({ query: query })
        } else {
            router.push({ pathname: "/search/[query]", params: { query: query } })
        }
    }

    return (
        <View className="w-full h-16 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary">
            <TextInput
                className="flex-1 text-white p-4 font-semibold text-base font-pregular"
                value={query}
                placeholderTextColor={'#CDCDE0'}
                placeholder={"seach for a video topic"}
                onChangeText={setQuery}
                onSubmitEditing={searchHandler}
            />

            <TouchableOpacity className="absolute right-3 top-4" onPress={searchHandler}>
                <Image source={icons.search} className="w-6 h-6" />
            </TouchableOpacity>

        </View>
    )
}

export default SearchInput