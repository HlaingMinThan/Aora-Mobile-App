import { SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton';
import { setItem } from 'expo-secure-store';
import useAuthUser from '@/hooks/useAuthUser';
import { router } from 'expo-router';

const Profile = () => {
    let { setUser, setIsLogin } = useAuthUser()
    let logout = () => {
        setItem("token", "");
        setUser(null);
        setIsLogin(false);
        router.navigate("/");
    }
    return (
        <SafeAreaView>
            <CustomButton title="logout" onPress={logout} />
        </SafeAreaView>
    )
}

export default Profile

