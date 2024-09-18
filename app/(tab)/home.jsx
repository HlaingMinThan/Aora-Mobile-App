import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import { useAllVideos } from '@/hooks/useVideoData';
import axios from '@/lib/axios'
import useAuthUser from '@/hooks/useAuthUser';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

const Home = () => {
    let { videos, getVideos, isLoading } = useAllVideos();
    let [trendingVideos, setTrendingVideos] = useState([]);
    let { user } = useAuthUser();
    let { videoId } = useLocalSearchParams();

    //handle after created
    useFocusEffect(
        useCallback(() => {
            if (videoId) {
                getVideos();
                getTrendings();
            }

            return () => {
                console.log('This route is now unfocused.');
            }
        }, [getVideos, getTrendings, videoId])
    )

    let getTrendings = useCallback(async () => {
        let res = await axios.get(`/api/videos/trending`);
        let videos = res.data.data;
        setTrendingVideos(videos);
    }, []);

    useEffect(() => {
        getTrendings();
    }, [getTrendings])

    return (
        <SafeAreaView className="bg-primary h-full">
            {!isLoading ? (<FlatList
                keyExtractor={(item) => item.id}
                data={videos}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={
                    <View className="px-4 my-6">
                        <View className="flex-row justify-between items-center">
                            <View className="space-y-2">
                                <Text className="text-gray-100">Welcome back </Text>
                                <Text className="text-white font-bold text-3xl">{user?.name}</Text>
                            </View>
                            <Image source={images.logoSmall} resizeMode='contain' className="w-9 h-10" />
                        </View>
                        <View className="mt-10">
                            <SearchInput />
                        </View>
                        <View className="my-2 font-pregular">
                            <Trending
                                videos={trendingVideos}
                            />
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View className="justify-center h-[50vh]">
                        <EmptyState title="No Videos Found" subtitle="Be the first one to upload the video" />
                    </View>
                }
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getVideos} tintColor={"#CDCDE0"} />}
            />) : (
                <ActivityIndicator className="mt-3" />
            )}
        </SafeAreaView>
    )
}

export default Home

