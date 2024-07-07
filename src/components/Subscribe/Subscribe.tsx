'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BannerImg = {
    backgroundImage: 'url(https://res.cloudinary.com/djhjt07rh/image/upload/v1719813696/Rectangle_26_2_udt6tz.png)',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
};

const Subscribe = () => {
    const [subscribe, setSubscribe] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: subscribe }), // assuming you need to send an object
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success(data.message, {
                        position: 'top-right'
                    });
                    setSubscribe('');
                } else {
                    toast.error(data.message, {
                        position: 'top-right'
                    });
                }
            } else {
                toast.error("There was a problem with your request.", {
                    position: 'top-right'
                });
            }
        } catch (error) {
            toast.error("There was an error processing your request.", {
                position: 'top-right'
            });
            console.log(error);
        }
    };

    return (
        <div data-aos="zoom-in" style={BannerImg}>
            <div className='container backdrop-blur-sm py-10'>
                <div className='space-y-6 max-w-[650px] mx-auto'>
                    <h1 data-aos="fade-up" className='text-2xl text-center sm:text-left sm:text-4xl font-semibold'>
                        Get Notified About New Products
                    </h1>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <input
                            data-aos="fade-up"
                            value={subscribe}
                            onChange={(e) => setSubscribe(e.target.value)}
                            type="email"
                            autoComplete='current-email'
                            required
                            placeholder='Enter your email'
                            className='w-full p-3 focus:outline-none rounded-md'
                        />
                        <div>
                            <button type='submit' className='px-4 py-2 bg-blue-600 rounded-md text-white hover:scale-105 transition-all duration-300 dark:bg-black dark:text-white'>
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Subscribe;
