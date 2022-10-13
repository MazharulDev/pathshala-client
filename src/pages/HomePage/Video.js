import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { BiLike } from "react-icons/bi"
import { AiFillInfoCircle } from "react-icons/ai"
import { AiOutlineEye } from 'react-icons/ai'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useQuery } from 'react-query';
import Loading from '../../shared/Loading/Loading';
import Dislike from './Dislike';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useLikes from '../../hooks/useLikes';


const Video = ({ video }) => {
    const { Likes } = useLikes()
    const [user, UserLoading, error] = useAuthState(auth);
    const [loading, setLoading] = useState(false)
    const [videoInfo, setVideoInfo] = useState({})
    useEffect(() => {
        setLoading(true)
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.youtubeID}&key=${process.env.REACT_APP_youtubeApiKey}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setVideoInfo(data.items[0])
                setLoading(false)
            })
    }, [video.youtubeID])
    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.stopVideo();
    }
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // handle like 

    const handleLike = (id) => {
        const liked = Likes.find(like => like?.likeCountUser === user?.email && like?.id === id)
        if (user) {
            const sendLikeInfo = {
                likeCountUser: user?.email,
                name: user?.displayName,
                id: id
            }

            if (!liked) {
                fetch(`https://gentle-journey-98275.herokuapp.com/likeDislike`, {
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
            } else if (liked) {
                toast.error("Already Liked")
            }

        } else {
            toast.error("Please Login then like video")
        }

    }
    const { data: getLike, isLoading, refetch } = useQuery('getLike', () => fetch('https://gentle-journey-98275.herokuapp.com/likeDislike', {
        method: 'GET',
    })
        .then(res => res.json()))
    refetch()
    if (isLoading) {
        return <Loading />
    }
    const countLike = getLike.find(like => like.id === video._id)
    const singleVideosLike = getLike.filter(like => like.id === video._id)
    return (

        <div className='w-96 p-3 bg-slate-300'>
            <YouTube videoId={video?.youtubeID} opts={opts} onReady={onPlayerReady} />
            <p className='flex justify-start items-center gap-2 mt-1'> <AiOutlineEye /> {videoInfo?.statistics?.viewCount}</p>
            {
                loading ? <p>Loading...</p> : <p className='mt-2'>{videoInfo?.snippet?.title}</p>
            }
            <div className='flex justify-between items-center text-2xl mt-2'>
                <div className='flex justify-center gap-2'>
                    <BiLike className='cursor-pointer' onClick={() => handleLike(video._id)} />
                    {
                        countLike ? singleVideosLike.length : 0
                    }
                    <Dislike video={video._id} />
                </div>
                <Link to={`videoDetails/${video._id}`}><AiFillInfoCircle /></Link>
            </div>
        </div>

    );
};

export default Video;