import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

const FormField = ({ title, value, onChangeText, otherStyles, keyboardType, placeHolder, onSubmitEditing, multiline, ...props }) => {

    let [showPw, setShowPw] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className={`w-full h-16 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary ${multiline ? 'h-32' : 'h-16'}`}>
                <TextInput
                    {...props}
                    multiline={multiline}
                    onSubmitEditing={onSubmitEditing}
                    className="flex-1 text-white p-4  font-semibold text-base"
                    value={value}
                    placeholderTextColor={'#CDCDE0'}
                    placeholder={placeHolder}
                    onChangeText={onChangeText}
                    secureTextEntry={keyboardType === 'password' && !showPw ? true : false}
                />
                {keyboardType === "password" && (
                    <TouchableOpacity className="absolute right-3 top-5" onPress={() => setShowPw(!showPw)}>
                        <Image source={showPw ? icons.eyeHide : icons.eye} className="w-6 h-6" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField