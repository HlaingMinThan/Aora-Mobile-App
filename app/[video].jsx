import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer';
import CustomButton from '@/components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import axios from '@/lib/axios';
import { getItem } from 'expo-secure-store';

const Video = () => {
    let { video: videoObjString } = useLocalSearchParams();
    let video = JSON.parse(videoObjString);
    let [loading, setLoading] = useState(false);
    let [alreadyBookmarked, setAlreadyBookmarked] = useState(false);

    let checkBookmark = useCallback(async () => {
        try {
            let token = await getItem("token");
            let res = await axios.get(`/api/videos/${video?.id}/check-bookmark`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setAlreadyBookmarked(res.data.data);
            }
        } catch (e) {
            console.log(e, 'error on checkBookmark')
        }
    }, [video])

    useEffect(() => {
        if (video) {
            checkBookmark()
        }
    }, [video, checkBookmark])

    let addToBookmark = async () => {
        try {
            setLoading(true);
            let res = await axios.post(`/api/videos/${video?.id}/toggle-bookmarks`, {}, {
                headers: {
                    Authorization: `Bearer ${await getItem("token")}`
                }
            });
            if (res.status === 200) {
                router.navigate('/bookmark');
            }
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }

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

                <CustomButton title={`${alreadyBookmarked ? 'Remove From' : 'Add To'} Bookmark`} onPress={addToBookmark} isLoading={loading} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Video