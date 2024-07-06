'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from 'next-auth/react';
import AOS from 'aos';
import "aos/dist/aos.css";
import { useRouter } from 'next/navigation';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { toast } from 'react-toastify';
import Notification from '@/components/Notification/Notification';




const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true); // State for password visibility
    const router = useRouter();
    const { data: session } = useSession();


    useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });

            if (response?.ok) {
                toast.success("Logged in successfully!", {
                    position: 'top-center'
                });
                router.push("/");
            } else if (response?.error) {
                toast.error("Invalid email or password. Please try again!", {
                    position: 'top-center'
                });
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred. Please try again.", {
                position: 'top-center'
            });
        }
    };

    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);




    return (
        <>
            <div className='flex items-center justify-center mx-auto my-auto w-full h-screen dark:bg-black dark:text-white'>
                <div className='w-full max-w-sm bg-gray-400 rounded-md p-4 dark:bg-gray-500 dark:text-black'>
                    <form onSubmit={handleSubmit}>
                        <h1 data-aos="fade-up" className='text-center text-xl font-bold mt-10 sm:mt-0'>SignIn to your account</h1>

                        <div data-aos="fade-down" className='flex flex-col pt-4 gap-2'>
                            <label>Email</label>
                            <input
                                className='px-4 p-2 placeholder:text-black rounded-md focus:outline-none focus:border-red-200 focus:ring-2 focus:ring-red-200'
                                type="email"
                                required
                                placeholder='Enter your email..'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div data-aos="fade-right" className='flex flex-col pt-4 gap-2'>
                            <label>Password</label>
                            <div className='flex items-center px-4 bg-white rounded-md focus-within:border-red-200 focus-within:ring-2 focus-within:ring-red-200'>
                                <input
                                    className='p-2 w-full placeholder:text-black focus:outline-none '
                                    type={showPassword ? 'password' : 'text'}
                                    placeholder='Enter your password..'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {
                                    showPassword ? (
                                        <MdVisibility size={24} onClick={() => setShowPassword((prev) => !prev)} />
                                    ) : (
                                        <MdVisibilityOff size={24} onClick={() => setShowPassword((prev) => !prev)} />
                                    )
                                }
                            </div>
                        </div>
                        <div data-aos="fade-up" className='flex flex-col pt-4 gap-2 text-center'>
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
                            data-aos="fade-left"
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                            className='flex items-center bg-white justify-center p-2 gap-2 rounded-full hover:bg-white/90'>
                            <p className='text-lg font-bold'>Google</p>
                            <FcGoogle size={24} />
                        </button>
                        <button
                            data-aos="fade-up-right"
                            onClick={() => signIn("github", { callbackUrl: "/" })}
                            className='flex items-center bg-white justify-center p-2 gap-2 rounded-full hover:bg-white/90'>
                            <p className='text-lg font-bold'>Github</p>
                            <FaGithub className='text-black' size={24} />
                        </button>
                        <div data-aos="fade-up-left">
                            <p>Don&apos;t have an account?<Link href={"/signup"} className="hover:text-red-200">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </>
    )
}

export default SignIn;
