import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiDislike } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useDislikes from '../../hooks/useDislike';
import Loading from '../../shared/Loading/Loading';

const Dislike = ({ video }) => {
    const { disLike } = useDislikes()
    const [user, UserLoading, error] = useAuthState(auth);
    const handleDislike = (id) => {
        const disLiked = disLike.find(unlike => unlike?.likeCountUser === user?.email && unlike?.id === id)
        if (user) {
            const sendLikeInfo = {
                likeCountUser: user?.email,
                name: user?.displayName,
                id: id
            }
            if (!disLiked) {
                fetch(`https://gentle-journey-98275.herokuapp.com/likeDislike/dislike`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(sendLikeInfo)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result) {
                            console.log(result);
                        }


                    })
            } else if (disLiked) {
                toast.error("Already Disliked")
            }
        } else {
            toast.error("Please login then dislike video")
        }
    }
    const { data: getDisLike, isLoading, refetch } = useQuery('getdisLike', () => fetch('https://gentle-journey-98275.herokuapp.com/likeDislike/dislike', {
        method: 'GET',
    })
        .then(res => res.json()))
    refetch()
    if (isLoading) {
        return <Loading />
    }
    const countDisLike = getDisLike.find(disLike => disLike.id === video)
    const singleVideosDisLike = getDisLike.filter(disLike => disLike.id === video)
    return (
        <div className='flex items-center gap-2'>
            <BiDislike className='cursor-pointer' onClick={() => handleDislike(video)} />
            {
                countDisLike ? singleVideosDisLike.length : 0
            }
        </div>
    );
};

export default Dislike;