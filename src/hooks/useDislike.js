import { useEffect, useState } from "react";

const useDislikes = () => {
    const [disLike, setDisLike] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/likeDislike/dislike')
            .then((res) => res.json())
            .then((data) => setDisLike(data));
    }, [])

    return { disLike }
};

export default useDislikes;