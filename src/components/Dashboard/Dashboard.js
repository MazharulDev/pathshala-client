import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboard" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <div className='flex justify-end mt-2'>
                        <label htmlFor="dashboard" className="btn btn-xs drawer-button lg:hidden">Open Sidebar</label>
                    </div>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-blue-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to="/dashboard">Add Video</Link></li>
                        <li><Link to="/dashboard/myvideos">My Videos</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;