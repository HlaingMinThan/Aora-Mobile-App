import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import axios from '@/lib/axios';
import useAuthUser from '@/hooks/useAuthUser';
import { deviceName } from 'expo-device';

const SignIn = () => {
    let [form, setForm] = useState({
        email: "",
        password: ""
    })
    let [errors, setErrors] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    let { getCurrentUser } = useAuthUser();

    const submit = async () => {
        try {
            setErrors(null);
            let res = await axios.post("/api/auth/login", { ...form, device_name: deviceName });
            setIsLoading(true);
            if (res.status === 200) {
                setIsLoading(false);
                await getCurrentUser(res.data);
                router.replace("/home");
            }
        } catch (e) {
            setIsLoading(false);
            setErrors(e.response?.data?.errors)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView  >
                <View className="w-full h-[85vh] justify-center px-4">
                    <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode='contain' />
                    <Text className="text-2xl mt-10 font-semibold text-white">Login To Aora</Text>
                    <FormField error={errors?.email} title="Email" value={form.email} onChangeText={e => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="text" />
                    <FormField error={errors?.password} e title="Password" value={form.password} onChangeText={e => setForm({ ...form, password: e })} otherStyles="mt-7" keyboardType="password" onSubmitEditing={submit} />
                    <CustomButton isLoading={isLoading} title="Sign In" onPress={submit} containerStyle="w-full mt-7" />
                    <View className="mt-4 flex-row items-center justify-center">
                        <Text className="text-gray-100 text-lg text-center">Don't Have An Account ?</Text>
                        <Link href="/signup" className="text-lg font-psemibold text-secondary"> Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn

