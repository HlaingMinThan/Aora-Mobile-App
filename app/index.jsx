import React from 'react'
import { Image, ScrollView, Text, View, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import useAuthUser from '@/hooks/useAuthUser';
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// https://www.nativewind.dev/quick-starts/expo
const Index = () => {
    useAuthUser();//handle prevention

    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState([]);
    const [notification, setNotification] = useState(undefined)

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }
        notificationListener.current = Notifications.addNotificationReceivedListener(response => {
            setNotification(response);

        });
        //handle when user click on notification
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            let data = response.notification.request.content.data;
            if (data?.screen) {
                router.navigate(data.screen);
            }
        });

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

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

                    <CustomButton title="Continue With Email" onPress={() => router.push('/signin')} containerStyle="w-full mt-7" />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style="light" />
        </SafeAreaView>
    )
}

export default Index

async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        console.log('hit')
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            // alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(token);
        } catch (e) {
            token = `${e}`;
        }
    } else {
        // alert('Must use physical device for Push Notifications');
    }
    console.log('hit runn', token)
    return token;
}

