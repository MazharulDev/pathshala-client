import { useEffect, useState } from "react";

const useDislikes = () => {
    const [disLike, setDisLike] = useState([])

    useEffect(() => {
        fetch('https://gentle-journey-98275.herokuapp.com/likeDislike/dislike')
            .then((res) => res.json())
            .then((data) => setDisLike(data));
    }, [])

    return { disLike }
};

export default useDislikes;