import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

let useAllVideos = () => {
    let [isLoading, setIsLoading] = useState(false);
    let [videos, setVideos] = useState([]);

    let getVideos = async () => {
        setIsLoading(true);
        let res = await axios.get('/api/videos');
        let videos = res.data.data;
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        setVideos(videos);
    }

    useEffect(() => {
        getVideos()
    }, []);

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