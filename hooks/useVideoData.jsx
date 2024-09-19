import { useCallback, useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { getItem } from 'expo-secure-store';

let useAllVideos = (url) => {
    let [videos, setVideos] = useState([]);

    let [isLoading, setIsLoading] = useState(videos.length ? false : true);

    let getVideos = useCallback(async () => {
        try {
            // if (!userId) {
            //     url = `/api/videos${query ? '?query=' + query : ''}`;
            // }
            // if (getBookMark && userId) {
            //     url = `/api/users/${userId}/bookmarks`;//user bookmarked videos
            // }
            // if (!getBookMark && userId) {
            //     url = `/api/users/${userId}/videos`;//user created videos
            // }
            let token = await getItem("token");
            if (token) {
                let res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                let videos = res.data.data;
                setIsLoading(false);
                setVideos(videos);
            }
        } catch (e) {
            console.log(e, 'error on getVideos')
        }
    }, [url]);

    useEffect(() => {
        getVideos()
    }, [getVideos, url]);


    return { videos, getVideos, isLoading };
}

let useVideo = (id) => {
    let [isLoading, setIsLoading] = useState(false);
    let [video, setVideo] = useState(null);
    let getVideo = async (id) => {
        setIsLoading(true);
        let res = await axios.get('/api/videos/' + id);
        let video = res.data.data;
        setIsLoading(false);
        setVideo(video);
    }

    useEffect(() => {
        getVideo(id)
    }, [id]);

    return { video, getVideo, isLoading };
}

export { useAllVideos, useVideo }