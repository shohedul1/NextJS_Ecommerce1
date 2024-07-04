'use client';
import Link from 'next/link'
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react';



const SignIn = () => {
    return (
        <div className='flex items-center justify-center mx-auto my-auto w-full h-screen dark:bg-black dark:text-white'>
            <div className='w-full max-w-sm bg-gray-400 rounded-md p-4 dark:bg-gray-500 dark:text-black'>
                <form action="">
                    <h1 className='text-center text-xl font-bold'>Login to your account</h1>
                    <div className='flex flex-col pt-4 gap-2'>
                        <label>Email</label>
                        <input
                            className='px-4 p-2 placeholder:text-black rounded-md focus:outline-none focus:border focus:border-red-200'
                            type="email"
                            placeholder='Enter your email..' />
                    </div>
                    <div className='flex flex-col pt-4 gap-2'>
                        <label>Password</label>
                        <input
                            className='px-4 p-2 placeholder:text-black rounded-md focus:outline-none focus:border focus:border-red-100'
                            type="password"
                            placeholder='Enter your password..' />
                    </div>
                    <div className='flex flex-col pt-4 gap-2 text-center'>
                        <div>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-orange-400 rounded-full text-white dark:bg-black hover:scale-110 duration-300 transition-all'
                            >
                                LogIn
                            </button>
                        </div>
                        <div className='text-3xl font-bold text-slate-600'>or</div>
                    </div>
                </form>
                <div className='flex flex-col gap-2'>
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className='flex items-center bg-white justify-center p-2 gap-2 rounded-full hover:bg-white/90'>
                        <p className='text-lg font-bold'>Google</p>
                        <FcGoogle size={24} />
                    </button>
                    <button
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                        className='flex items-center bg-white justify-center p-2 gap-2 rounded-full hover:bg-white/90'>
                        <p className='text-lg font-bold'>Github</p>
                        <FaGithub className='text-black' size={24} />
                    </button>
                    <div>
                        <p>Don't have an account?<Link href={"/"} className="hover:text-red-200">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn