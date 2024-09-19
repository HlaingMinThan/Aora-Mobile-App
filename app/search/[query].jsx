import { SafeAreaView, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import { useAllVideos } from '@/hooks/useVideoData';
import useAuthUser from '@/hooks/useAuthUser';

const Search = () => {
    let { query, searchFromBookmark } = useLocalSearchParams();
    let { user } = useAuthUser();
    let url = searchFromBookmark ? `/api/users/${user?.id}/bookmarks` : `/api/videos`
    console.log(searchFromBookmark)
    let { videos, isLoading } = useAllVideos(url + `${query ? '?query=' + query : ''}`);

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
                                <SearchInput initialSearch={query} searchFromBookmark={searchFromBookmark ?? false} />
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

