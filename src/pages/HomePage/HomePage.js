import React from 'react';
import { useQuery } from 'react-query'
import Loading from '../../shared/Loading/Loading';
import Video from './Video';

const HomePage = () => {
    const { data: videos, isLoading, refetch } = useQuery('taskList', () => fetch('http://localhost:5000/videos', {
        method: 'GET',
    })
        .then(res => res.json()))
    refetch()
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='grid grid-cols-3 gap-4 w-fit mx-auto mt-5 mb-5'>
            {
                videos?.map(video => <Video key={video._id} video={video} />)
            }
        </div>
    );
};

export default HomePage;