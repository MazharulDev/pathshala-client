import { useEffect, useState } from "react";

const useLikes = () => {
    const [Likes, setLikes] = useState([])

    useEffect(() => {
        fetch('https://gentle-journey-98275.herokuapp.com/likeDislike')
            .then((res) => res.json())
            .then((data) => setLikes(data));
    }, [])

    return { Likes }
};

export default useLikes;