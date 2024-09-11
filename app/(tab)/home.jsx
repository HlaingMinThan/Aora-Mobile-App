import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';

const home = () => {
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={[{ id: 1 }, { id: 2 }]}
                renderItem={({ item }) => <Text className="text-white">{item.id}</Text>}
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
                                posts={[{ id: 1 }, { id: 2 }] ?? []}
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

export default home

