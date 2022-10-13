import { useQuery } from "react-query";
import Loading from "../shared/Loading/Loading";

const useDislike = () => {
    const { data: getDisLike, isLoading, refetch } = useQuery('getLike', () => fetch('http://localhost:5000/likeDislike/dislike', {
        method: 'GET',
    })
        .then(res => res.json()))
    refetch()
    if (isLoading) {
        return <Loading />
    }


    return { getDisLike }
};

export default useDislike;