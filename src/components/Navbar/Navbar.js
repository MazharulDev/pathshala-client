import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../shared/Loading/Loading';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <Loading />
    }
    if (error) {
        toast.error(error?.message)
    }
    return (
        <div className='p-3 bg-blue-500'>
            <div className='flex justify-between items-center text-white'>
                <div>
                    <p className='text-2xl font-bold'>Pathshala</p>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <Link className='hover:text-gray-300' to="/">Home</Link>
                    <Link className='hover:text-gray-300' to="/Dashboard">Dashboard</Link>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <p>Email</p>
                    {
                        user ? <button onClick={() => signOut(auth)} className='px-2 py-1 bg-red-400 rounded-lg hover:bg-red-300'>Logout</button> : <Link to="/login" className='px-2 py-1 bg-red-400 rounded-lg hover:bg-red-300'>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;