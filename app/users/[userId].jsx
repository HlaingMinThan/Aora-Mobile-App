import { useLocalSearchParams } from 'expo-router';
import ReusableProfile from '@/components/ReusableProfile';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAllVideos } from '@/hooks/useVideoData';

const Profile = () => {
    let { userId } = useLocalSearchParams();
    let { videos, getVideos, isLoading } = useAllVideos("", userId);
    let [user, setUser] = useState(null)

    useEffect(() => {
        axios.get('/api/users/' + userId).then((res) => {
            setUser(res.data.data)
            getVideos()
        })
    }, [userId, getVideos])

    return (
        <ReusableProfile user={user} isLoading={isLoading} videos={videos} refreshVideos={getVideos} />
    )
}

export default Profile

