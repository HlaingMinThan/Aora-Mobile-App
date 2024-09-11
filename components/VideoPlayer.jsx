import { View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ResizeMode, Video } from 'expo-av'

const VideoPlayer = ({ video }) => {
    let [videoLoading, setVideoLoading] = useState(true);
    return (
        <View className="justify-center items-center mt-3">
            <Video
                source={{ uri: video }}
                className="w-full h-72 rounded-xl border-[0.5px] border-gray-50"
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