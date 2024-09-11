import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import useAuthUser from '@/hooks/useAuthUser';
// https://www.nativewind.dev/quick-starts/expo
const Index = () => {
    useAuthUser();//handle prevention
    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="h-full justify-center items-center w-full px-4">
                    <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode='contain' />
                    <Image source={images.cards} className="w-[380px] h-[300px]" resizeMode='contain' />
                    <View className="mt-10">
                        <Text className="text-3xl font-bold text-white text-center">Discover Endless Possibilities with <Text className="text-secondary-100">Aora</Text></Text>
                        <Image source={images.path} className="absolute -right-8 -bottom-2 h-[15px] w-[135px]" resizeMode='contain'></Image>
                    </View>
                    <Text className="text-gray-100 text-center mt-7 text-sm font-pregular">Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>

                    <CustomButton title="Continue With Email" onPress={() => router.push('/home')} containerStyle="w-full mt-7" />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style="light" />
        </SafeAreaView>
    )
}

export default Index

