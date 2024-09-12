import { SafeAreaView, Text, View, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import { useAllVideos } from '@/hooks/useVideoData';

const Search = () => {
    let { query } = useLocalSearchParams();
    let { videos, isLoading } = useAllVideos(query);

    return (
        <SafeAreaView className="bg-primary h-full">
            {!isLoading ? (
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
                            <EmptyState title="No Videos Found" subtitle="No search results found for this search query" />
                        </View>
                    }
                />
            ) : (
                <ActivityIndicator className="mt-3" />
            )}
        </SafeAreaView>
    )
}

export default Search

