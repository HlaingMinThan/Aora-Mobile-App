import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants';
import { View as AnimatableView } from 'react-native-animatable';
import { router } from 'expo-router';

const TrendingItem = ({ item: { id, video, title, thumbnail }, activeItem }) => {
    const zoomIn = {
        0: {
            scale: 1
        },
        1: {
            scale: 0.9
        }
    }
    const zoomOut = {
        0: {
            scale: 0.9
        },
        1: {
            scale: 1
        }
    }
    return (
        <AnimatableView animation={id === activeItem ? zoomOut : zoomIn}>
            <View className="w-52  mr-3 mt-3">
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push({
                        pathname: "[video]",
                        params: {
                            video: id
                        }
                    })}
                    className="relative justify-center items-center ">
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-72  mt-3 opacity-80 rounded-3xl"
                        resizeMode='cover'
                    />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </AnimatableView>
    )
}

export default TrendingItem