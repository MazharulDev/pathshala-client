import React from 'react';
import YouTube from 'react-youtube';

const Video = ({ video }) => {
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
    return (

        <div className='w-96 p-3 bg-slate-300'>
            <YouTube videoId={video?.youtubeID} opts={opts} onReady={onPlayerReady} />
        </div>

    );
};

export default Video;