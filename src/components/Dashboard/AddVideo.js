import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
const getYouTubeID = require('get-youtube-id');

const AddVideo = () => {
    const [user] = useAuthState(auth);
    const url = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const yUrl = url.current.value;
        const youtubeId = getYouTubeID(yUrl)
        const addVideoInfo = {
            youtubeID: youtubeId,
            author: user.email,
        }
        fetch('http://localhost:5000/videos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addVideoInfo)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    toast.success("Successfully added videos")
                    url.current.value = ''
                }


            })

    }
    return (
        <div>
            <div className='text-center text-2xl my-4 font-bold'>
                <h1>Upload Youtube Videos</h1>
            </div>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit}>
                    <input className='bg-transparent focus:outline-none p-2  border-b-2 border-gray-700 mr-4' type="url" name="" placeholder='Type and paste youtube url...' ref={url} />
                    <input className='px-6 py-1 text-white mt-5 ml-2 bg-gradient-to-b from-[#45b0a6] to-[#3d8d85] rounded-full hover:text-gray-200 cursor-pointer' type="submit" value="Upload" />
                </form>
            </div>
        </div>
    );
};

export default AddVideo;