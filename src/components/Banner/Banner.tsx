import React from 'react'
import { GiFoodTruck } from 'react-icons/gi'
import { GrSecure } from 'react-icons/gr'
import { IoFastFood } from 'react-icons/io5';
import { GiFloorHatch } from "react-icons/gi";


const Banner = () => {
    return (
        <div className='flex justify-center items-center py-12  dark:bg-black dark:text-white min-h-[550px]'>
            <div className='container'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-12 items-center'>
                    <div
                        data-aos="zoom-in"
                    >
                        <img
                            src="https://res.cloudinary.com/djhjt07rh/image/upload/v1719304366/next.js_blog_images/isow2izadskfy7whu1lw.jpg"
                            alt="image"
                            className='max-w-[400] h-[350px] w-full drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] '

                        />
                    </div>
                    {/* text details section */}
                    <div className='flex flex-col justify-center gap-6 sm:gap-0'>
                        <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
                            Winter Sale upto 50% Off
                        </h1>
                        <p data-aos="fade-up" className="text-sm text-gray-500 tracking-wide leading-5">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                            reiciendis inventore iste ratione ex alias quis magni at optio
                        </p>
                        <div className='flex flex-col gap-4'>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <GrSecure className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400' />
                                <p>Quality Products</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <IoFastFood className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-red-100 dark:bg-red-400' />
                                <p>Fast Delivery</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <GiFoodTruck className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400' />
                                <p>Easy Payment method</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <GiFloorHatch className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-blue-100 dark:bg-blue-400' />
                                <p>Get Offers</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Banner