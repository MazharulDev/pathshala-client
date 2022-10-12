import React from 'react';
import { Link } from "react-router-dom"

const Navbar = () => {
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
                    <button className='px-2 py-1 bg-red-400 rounded-lg hover:bg-red-300'>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;