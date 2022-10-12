import React, { useRef } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../shared/Loading/Loading';

const CreateAccount = () => {
    const navigate = useNavigate()
    const [
        createUserWithEmailAndPassword,
        emailUser,
        loading,
        emailError,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);
    const email = useRef()
    const user = useRef()
    const password = useRef()
    const handleSubmit = async e => {
        e.preventDefault()
        const userEmail = email.current.value;
        const userName = user.current.value;
        const userPassword = password.current.value;
        await createUserWithEmailAndPassword(userEmail, userPassword)
        await updateProfile({ displayName: userName })
        localStorage.setItem("email", userEmail)
    }
    if (emailUser) {
        toast.success("Signup successfull")
        navigate("/")
    }
    if (loading || updating) {
        return <Loading />
    }
    if (emailError) {
        toast.error(emailError?.message)
    }
    return (
        <div>
            <div>
                <h2 className='text-2xl font-bold text-center my-4'>Create Account</h2>
            </div>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit}>
                    <input className='bg-transparent focus:outline-none p-2  border-b-2 border-gray-700' type="email" name="email" placeholder='Email or Username' ref={email} required /> <br />
                    <input className='bg-transparent focus:outline-none p-2 mt-4  border-b-2 border-gray-700' type="text" name="username" placeholder='Username' ref={user} required /> <br />
                    <input className='bg-transparent focus:outline-none p-2 mt-4  border-b-2 border-gray-700' type="password" name="password" placeholder='Password' ref={password} required /> <br />
                    <input className='px-6 py-1 text-white mt-5 ml-2 bg-gradient-to-b from-[#45b0a6] to-[#3d8d85] rounded-full hover:text-gray-200 cursor-pointer' type="submit" value="Signup" />
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;