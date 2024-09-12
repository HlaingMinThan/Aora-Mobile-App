import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import VideoPlayer from '@/components/VideoPlayer';
import { useLocalSearchParams } from 'expo-router';

const Video = () => {
    let { video: videoObjString } = useLocalSearchParams();
    let video = JSON.parse(videoObjString);

    return (
        <SafeAreaView className="bg-primary  h-full">
            <VideoPlayer video={video?.video} />
            <ScrollView>
                <View className="flex-row  items-center justify-between my-3 p-3">
                    <View className="flex-row space-x-3">
                        <View>
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/300' }}
                                className="w-[60px] h-[60px] border-2 rounded-lg border-secondary"
                                resizeMode='contain'
                            />
                        </View>
                        <View>
                            <Text className="font-bold  text-xl text-white">{video?.title}</Text>
                            <Text className="font-bold  text-gray-100 text-sm">{video?.creator?.name}</Text>
                        </View>
                    </View>
                </View>

                <Text className="text-white my-3 px-4" >
                    {video?.description}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Video