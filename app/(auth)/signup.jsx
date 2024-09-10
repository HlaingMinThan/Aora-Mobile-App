import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

const SignUp = () => {
    let [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    let [isLoading, setIsLoading] = useState(false);

    const submit = () => {
        setIsLoading(true);
    }

    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView  >
                <View className="w-full h-[85vh] justify-center px-4">
                    <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode='contain' />
                    <Text className="text-2xl mt-10 font-semibold text-white">Login To Aora</Text>
                    <FormField title="Email" value={form.username} onChangeText={e => setForm({ ...form, username: e })} otherStyles="mt-7" keyboardType="username" />
                    <FormField title="Email" value={form.email} onChangeText={e => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email" />
                    <FormField title="Password" value={form.password} onChangeText={e => setForm({ ...form, password: e })} otherStyles="mt-7" keyboardType="password" />
                    <CustomButton isLoading={isLoading} title="Sign In" onPress={submit} containerStyle="w-full mt-7" />
                    <View className="mt-4 flex-row items-center justify-center">
                        <Text className="text-gray-100 text-lg text-center">Already Have An Account ?</Text>
                        <Link href="/signin" className="text-lg font-psemibold text-secondary"> Sign In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp

