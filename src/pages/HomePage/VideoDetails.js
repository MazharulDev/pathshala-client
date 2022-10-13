import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useDislikes from '../../hooks/useDislike';
import useLikes from '../../hooks/useLikes';
import useVideos from '../../hooks/useVideos';
import Loading from '../../shared/Loading/Loading';

const VideoDetails = () => {
    const { id } = useParams()
    const { Likes } = useLikes()
    const { disLike } = useDislikes()
    const { videos } = useVideos()
    const singleVideosLike = Likes.filter(like => like.id === id)
    const singleVideosDisLike = disLike.filter(disLike => disLike.id === id)
    const author = videos.find(video => video._id === id)

    return (
        <div className='flex justify-around items-center'>
            <div>
                <p className='text-2xl font-bold'>Liked person Name</p>
                {
                    singleVideosLike?.map(likes => <div key={likes._id}>
                        <p>{likes?.name}</p>
                    </div>)
                }
            </div>
            <div>
                <p className='text-2xl font-bold'>Disliked person Name</p>
                {
                    singleVideosDisLike?.map(disLikes => <div key={disLikes._id}>
                        <p>{disLikes?.name}</p>
                    </div>)
                }
            </div>
            <div>
                <p className='text-2xl font-bold'>Who uploaded Video</p>
                <p>{author?.author}</p>
            </div>
        </div>
    );
};

export default VideoDetails;