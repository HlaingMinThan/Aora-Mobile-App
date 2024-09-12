import { View, Image, Text } from 'react-native'
import React from 'react'
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="justify-center items-center px-4">
            <Image source={images.empty} className="w-[270px] h-[200px]" resizeMode='contain' />
            <Text className="text-white font-bold text-2xl">{title}</Text>
            <Text className="text-gray-100 mt-3">{subtitle}</Text>
            <CustomButton title="Create Video" onPress={() => router.push('/create')} containerStyle="w-full my-5" />
        </View>
    )
}

export default EmptyState