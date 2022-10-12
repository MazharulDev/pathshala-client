import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from '../../shared/Loading/Loading';

const Login = () => {
    const navigate = useNavigate()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, GoogleUser, GoogleLoading, GoogleError] = useSignInWithGoogle(auth);
    const email = useRef()
    const password = useRef()
    const handleSubmit = e => {
        e.preventDefault()
        const userEmail = email.current.value;
        const userPassword = password.current.value;
        signInWithEmailAndPassword(userEmail, userPassword)
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
    }
    if (user || GoogleUser) {
        toast.success("login successfull")
        navigate("/")
    }
    if (error || GoogleError) {
        toast.error(error?.message)
    }
    if (loading || GoogleLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="text-center text-2xl font-bold mt-4">
                Login
            </div>
            <div className='flex justify-center'>
                <form className='mt-8 ' onSubmit={handleSubmit}>
                    <input className='bg-transparent focus:outline-none p-2 border-b-2 border-gray-700' type="email" name="" placeholder='Email or Username' ref={email} required /> <br />
                    <input className='bg-transparent focus:outline-none p-2 mt-4 border-b-2 border-gray-700' type="password" name="" placeholder='Password' ref={password} required />
                    <label className='flex justify-start items-center gap-2 ml-2 mt-5'>
                        <input type="checkbox" className='' />
                        <p className='text-gray-400'>Remember me</p>
                    </label>
                    <input className='px-6 py-1 text-white mt-5 ml-2 bg-gradient-to-b from-[#45b0a6] to-[#3d8d85] rounded-full hover:text-gray-200 cursor-pointer' type="submit" value="Login" />
                </form>
            </div>
            <Link className='text-blue-500 flex justify-center mt-5 hover:text-blue-600' to="/createaccount">Create Account</Link>
            <div className='flex justify-center'>
                <button onClick={handleGoogleSignIn} className='px-6 py-1 text-white mt-5 ml-2 bg-gradient-to-b from-[#45b0a6] to-[#3d8d85] rounded-full hover:text-gray-200 cursor-pointer'>Sign in with Google</button>
            </div>
        </div>
    );
};

export default Login;