import { SafeAreaView, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import { useAllVideos } from '@/hooks/useVideoData';

const Search = () => {
    let { query } = useLocalSearchParams();
    let { videos } = useAllVideos(query);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                keyExtractor={(item) => item.id}
                data={videos}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={
                    <View className="px-4 my-6">
                        <View className="flex-row justify-between items-center">
                            <View className="space-y-2">
                                <Text className="text-gray-100">Search results for </Text>
                                <Text className="text-white font-bold text-3xl">{query}</Text>
                            </View>
                        </View>
                        <View className="my-10">
                            <SearchInput initialSearch={query} />
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

export default Search

