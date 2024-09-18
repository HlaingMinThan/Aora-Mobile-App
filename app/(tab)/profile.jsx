import { router } from 'expo-router';
import { setItem } from 'expo-secure-store';
import useAuthUser from '@/hooks/useAuthUser';
import ReusableProfile from '@/components/ReusableProfile';
import { useAllVideos } from '@/hooks/useVideoData';

const Profile = () => {

    let { setUser, setIsLogin, user } = useAuthUser()
    let { videos, getVideos, isLoading } = useAllVideos();

    let logout = () => {
        //call logout api to delete token
        setItem("token", "");
        setUser(null);
        setIsLogin(false);
        router.navigate("/");
    }

    return (
        <ReusableProfile handleLogout={logout} user={user} isLoading={isLoading} videos={videos} refreshVideos={getVideos} />
    )
}

export default Profile

