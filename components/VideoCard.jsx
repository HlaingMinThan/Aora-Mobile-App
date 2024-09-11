import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';
import VideoPlayer from './VideoPlayer';
import { router } from 'expo-router';

const VideoCard = ({ video: { title, thumbnail, video, creator } }) => {
    let [play, setPlay] = useState(false);
    return (
        <View className="px-4 space-y-2 mb-12">
            <View className="flex-row  items-center justify-between">
                <View className="flex-row space-x-3">
                    <View>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/300' }}
                            className="w-[60px] h-[60px] border-2 rounded-lg border-secondary"
                            resizeMode='contain'
                        />
                    </View>
                    <View>
                        <Text className="font-bold  text-xl text-white">{title}</Text>
                        <Text className="font-bold  text-gray-100 text-sm">{creator}</Text>
                    </View>
                </View>
                <View className="justify-start h-[50px]">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain' />
                </View>
            </View>
            {<TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push({
                    pathname: "/[video]",
                    params: {
                        video: video
                    }
                })}
                className="relative justify-center items-center">
                <Image
                    source={{ uri: thumbnail }}
                    className="w-full h-60 rounded-xl mt-3"
                    resizeMode='cover'
                />
                <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
            </TouchableOpacity>}
        </View>
    )
}

export default VideoCard