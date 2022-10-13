import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiDislike } from 'react-icons/bi';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../shared/Loading/Loading';

const Dislike = ({ video }) => {
    const [user, UserLoading, error] = useAuthState(auth);
    const handleDislike = (id) => {
        const sendLikeInfo = {
            likeCountUser: user?.email,
            name: user?.displayName,
            id: id
        }
        fetch(`http://localhost:5000/likeDislike/dislike`, {
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
    }
    const { data: getDisLike, isLoading, refetch } = useQuery('getdisLike', () => fetch('http://localhost:5000/likeDislike/dislike', {
        method: 'GET',
    })
        .then(res => res.json()))
    refetch()
    if (isLoading) {
        return <Loading />
    }
    console.log(getDisLike);
    const countDisLike = getDisLike.find(disLike => disLike.id === video)
    const singleVideosDisLike = getDisLike.filter(disLike => disLike.id === video)
    return (
        <div className='flex items-center gap-2'>
            <BiDislike onClick={() => handleDislike(video)} />
            {
                countDisLike ? singleVideosDisLike.length : 0
            }
        </div>
    );
};

export default Dislike;