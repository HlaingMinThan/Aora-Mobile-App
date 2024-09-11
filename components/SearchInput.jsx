import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

const SearchInput = ({ value, onChangeText, placeHolder }) => {

    let [showPw, setShowPw] = useState(false);

    return (
        <View className="w-full h-16 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary">
            <TextInput
                className="flex-1 text-white p-2 font-semibold text-base font-pregular"
                value={value}
                placeholderTextColor={'#7b7b8b'}
                placeholder={placeHolder}
                onChangeText={onChangeText}
            />

            <TouchableOpacity className="absolute right-3 top-4" onPress={() => setShowPw(!showPw)}>
                <Image source={icons.search} className="w-6 h-6" />
            </TouchableOpacity>

        </View>
    )
}

export default SearchInput