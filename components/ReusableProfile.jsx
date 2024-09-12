import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import useAuthUser from '@/hooks/useAuthUser';
import { useNavigationState } from '@react-navigation/native';

const ReusableProfile = ({ handleLogout = null, user, isLoading, videos, refreshVideos }) => {
    let { user: authUser } = useAuthUser()
    const state = useNavigationState(state => state);

    return (
        <SafeAreaView className="bg-primary h-full">
            {!isLoading ? (<FlatList
                keyExtractor={(item) => item.id}
                data={videos}
                renderItem={({ item }) => <VideoCard video={item} name={user?.name} />}
                ListHeaderComponent={
                    <View className={`w-full justify-center items-center mb-6  px-4 ${state.type === 'stack' ? 'space-y-10 mt-20' : ''}`}>
                        {(state.type === 'tab' && authUser?.id === user?.id) && <TouchableOpacity onPress={handleLogout} className="items-end w-full mb-10">
                            <Image source={icons.logout} className="w-6 h-6" resizeMode='contain' />
                        </TouchableOpacity>}
                        <View className="w-24 h-24  rounded-lg  justify-center items-center space-y-3">
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/300' }}
                                className="w-24 h-24 border-2 rounded-lg border-secondary"
                                resizeMode='cover'
                            />
                            <Text className="text-white font-bold text-lg">{user?.name}</Text>
                        </View>
                        <View className="flex-row justify-center items-center space-x-10 mt-5">
                            <View className="items-center">
                                <Text className="text-white text-xl font-bold">10</Text>
                                <Text className="text-base text-gray-100">Posts</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-xl font-bold">1.2K</Text>
                                <Text className="text-base text-gray-100">Views</Text>
                            </View>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View className="justify-center h-[50vh]">
                        <EmptyState title="No Videos Found" subtitle="Be the first one to upload the video" />
                    </View>
                }
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshVideos} tintColor={"#CDCDE0"} />}
            />) : (
                <ActivityIndicator className="mt-3" />
            )}
        </SafeAreaView>
    )
}

export default ReusableProfile

