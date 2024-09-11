import { View, TouchableOpacity, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

const TrendingItem = ({ video: { title, thumbnail } }) => {
    let [play, setPlay] = useState(false);
    return (
        play ?
            <Text className="text-white">Playing</Text> :
            (
                <View className="w-52  mr-4 ">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setPlay(true)}
                        className="relative justify-center items-center ">
                        <Image
                            source={{ uri: thumbnail }}
                            className="w-full h-64  mt-3 opacity-80 rounded-3xl"
                            resizeMode='cover'
                        />
                        <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            )
    )
}

export default TrendingItem