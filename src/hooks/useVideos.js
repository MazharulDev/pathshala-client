import { useEffect, useState } from "react";

const useVideos = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetch('https://gentle-journey-98275.herokuapp.com/videos')
            .then((res) => res.json())
            .then((data) => setVideos(data));
    }, [])

    return { videos }
};

export default useVideos;