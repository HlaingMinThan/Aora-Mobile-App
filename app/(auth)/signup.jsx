import React, { useState } from 'react'
import {  Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import axios from '@/lib/axios';
import * as Device from 'expo-device';
import useAuthUser from '@/hooks/useAuthUser';

const SignUp = () => {
    let [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })
    let [errors, setErrors] = useState(null);
    let { getCurrentUser } = useAuthUser();
    let [isLoading, setIsLoading] = useState(false);

    const submit = async () => {
        try {
            setIsLoading(true);
            let device_name = Device.deviceName;

            let res = await axios.post("/api/auth/register", {
                name: form.username,
                email: form.email,
                password: form.password,
                device_name
            })


            await getCurrentUser(res.data);
            if (res.status === 200) {
                setIsLoading(false);
                router.push("/home");
            }
        } catch (e) {
            setIsLoading(false);
            console.log(e.response?.data?.errors, 'register')
            setErrors(e.response?.data?.errors)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView  >
                <View className="w-full h-[85vh] justify-center px-4">
                    <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode='contain' />
                    <Text className="text-2xl mt-10 font-semibold text-white">Register To Aora</Text>
                    <FormField error={errors?.name} title="Username" value={form.username} onChangeText={e => setForm({ ...form, username: e })} otherStyles="mt-7" keyboardType="text" />
                    <FormField error={errors?.email} title="Email" value={form.email} onChangeText={e => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="text" />
                    <FormField error={errors?.password} title="Password" value={form.password} onChangeText={e => setForm({ ...form, password: e })} otherStyles="mt-7" keyboardType="password" onSubmitEditing={submit} />
                    <CustomButton isLoading={isLoading} title="Sign Up" onPress={submit} containerStyle="w-full mt-7" />
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

