import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';

const Create = () => {
    let [form, setForm] = useState({
        title: '',
        video: "",
        thumbnail: ''
    });
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4">
                <Text className="mt-2 text-white font-bold text-2xl">Upload Video</Text>
                <View className="mt-2">
                    <FormField title="Video Title" value={form.email} onChangeText={e => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="text" placeHolder="type your video title" />
                </View>
                <View className="mt-2">
                    <FormField multiline title="Video Title" value={form.email} onChangeText={e => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="text" placeHolder="type your video description" />
                </View>
                <View className="mt-7 juce">
                    <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
                    <View className="w-full h-40 rounded-2xl mt-2 bg-black-100 justify-center items-center">
                        <View className="w-14 h-14 border-secondary-200 border-dashed border-2 justify-center items-center">
                            <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
                        </View>
                    </View>
                </View>
                <View className="mt-7 juce">
                    <Text className="text-base text-gray-100 font-pmedium">Upload Thumbnail</Text>
                    <View className="w-full h-20 rounded-2xl mt-2 bg-black-100 justify-center items-center">
                        <Image source={icons.upload} className="w-6 h-6" resizeMode='contain' />
                    </View>
                </View>
                <View className="mt-7">
                    <CustomButton title="Share" onPress={() => console.log('hello')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create

