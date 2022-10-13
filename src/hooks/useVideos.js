import { useEffect, useState } from "react";

const useVideos = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/videos')
            .then((res) => res.json())
            .then((data) => setVideos(data));
    }, [])

    return { videos }
};

export default useVideos;