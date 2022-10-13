import { useEffect, useState } from "react";

const useLikes = () => {
    const [Likes, setLikes] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/likeDislike')
            .then((res) => res.json())
            .then((data) => setLikes(data));
    }, [])

    return { Likes }
};

export default useLikes;