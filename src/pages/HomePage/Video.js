import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { BiLike } from "react-icons/bi"
import { BiDislike } from "react-icons/bi"
import { AiFillInfoCircle } from "react-icons/ai"
import { AiOutlineEye } from 'react-icons/ai'


const Video = ({ video }) => {
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
    const [linkCount, setLikeCount] = useState(0)
    const handleLink = () => {
        setLikeCount(linkCount + 1)
    }
    return (

        <div className='w-96 p-3 bg-slate-300'>
            <YouTube videoId={video?.youtubeID} opts={opts} onReady={onPlayerReady} />
            <p className='flex justify-start items-center gap-2 mt-1'> <AiOutlineEye /> {videoInfo?.statistics?.viewCount}</p>
            {
                loading ? <p>Loading...</p> : <p className='mt-2'>{videoInfo?.snippet?.title}</p>
            }
            <div className='flex justify-between items-center text-2xl mt-2'>
                <div className='flex justify-center gap-2'>
                    <BiLike onClick={handleLink} />
                    <BiDislike />
                </div>
                <AiFillInfoCircle />
            </div>
        </div>

    );
};

export default Video;