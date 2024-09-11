import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';

const Home = () => {
    let [videos, setVideos] = useState([
        {
            id: 1,
            title: "Video 1",
            thumbnail: "https://picsum.photos/200/300",
            video: images.video1,
            creator: "Hlaing min than"
        },
        {
            id: 2,
            title: "Video 1",
            thumbnail: "https://picsum.photos/200/300",
            video: images.video1,
            creator: "Hlaing min than"
        },
        {
            id: 3,
            title: "Video 1",
            thumbnail: "https://picsum.photos/200/300",
            video: images.video1,
            creator: "Hlaing min than"
        },
    ]);
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={videos}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={
                    <View className="px-4 my-6">
                        <View className="flex-row justify-between items-center">
                            <View className="space-y-2">
                                <Text className="text-gray-100">Welcome back </Text>
                                <Text className="text-white font-bold text-3xl">Hlaing min than</Text>
                            </View>
                            <Image source={images.logoSmall} resizeMode='contain' className="w-9 h-10" />
                        </View>
                        <View className="mt-10">
                            <SearchInput placeHolder="seach for a video topic" />
                        </View>
                        <View className="my-2 font-pregular">
                            <Trending
                                videos={videos}
                            />
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View className="justify-center h-[50vh]">
                        <EmptyState title="No Videos Found" subtitle="Be the first one to upload the video" />
                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default Home

