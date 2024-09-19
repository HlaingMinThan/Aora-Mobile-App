import { router, useFocusEffect } from 'expo-router';
import { getItem, setItem } from 'expo-secure-store';
import useAuthUser from '@/hooks/useAuthUser';
import ReusableProfile from '@/components/ReusableProfile';
import { useAllVideos } from '@/hooks/useVideoData';
import axios from 'axios';

const Profile = () => {

    let { setUser, setIsLogin, user } = useAuthUser()
    let { videos, getVideos, isLoading } = useAllVideos("", user?.id);

    useFocusEffect(() => {
        getVideos();
    })

    let logout = async () => {
        try {
            //call logout api to delete token
            let token = await getItem("token");
            let res = await axios.post('/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data)
            if (res.status === 200) {
                setItem("token", "");
                setUser(null);
                setIsLogin(false);
            }
            router.navigate("/");
        } catch (e) {
            console.log('error on logout', e.response)
        }
    }

    return (
        <ReusableProfile handleLogout={logout} user={user} isLoading={isLoading} videos={videos} refreshVideos={getVideos} />
    )
}

export default Profile

