import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ResizeMode, Video } from 'expo-av'

const VideoPlayer = ({ video, isLoading }) => {
    let [videoLoading, setVideoLoading] = useState(true);
    useEffect(() => {
        if (isLoading) {
            setVideoLoading(true)
        }
    }, [isLoading])
    return (
        <View className="justify-center items-center ">
            <Video
                source={{ uri: video }}
                className="w-full h-72 rounded-xl bg-black"
                shouldPlay
                useNativeControls
                onLoad={() => setVideoLoading(false)}
                resizeMode={ResizeMode.CONTAIN}
            />
            {videoLoading && <ActivityIndicator size={'large'} color="#CDCDE0" className="absolute" />}
        </View>
    )
}

export default VideoPlayer