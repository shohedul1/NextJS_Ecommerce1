'use client';
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { MdDelete, MdOutlineArrowCircleLeft } from 'react-icons/md';
import Link from 'next/link';

const CartPage = () => {
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
        <div className=' py-10 bg-gray-200 dark:bg-black dark:text-white'>
            <div className='flex flex-col container'>
                <div className="flex flex-col items-center gap-5 pb-2">
                    <h1
                        data-aos="fade-up"
                        className="text-xl font-bold">Your Cart</h1>
                    <h2 data-aos="fade-up" className="text-gray-500">
                        Subtotal: <span className="text-gray-600">$45665</span>
                    </h2>
                </div>
                <div className="flex flex-col gap-8">
                    {/* product details */}
                    <div className="flex items-center flex-col md:flex-row gap-5">
                        {/* product img and tittle quanty heading  */}
                        <div className="flex gap-8 sm:gap-20 flex-col md:flex-row items-center text-xs">
                            <img
                                src={"https://res.cloudinary.com/djhjt07rh/image/upload/v1719242342/next.js_blog_images/xdv5rha2bvmubo0lbxly.png"}
                                alt="product"
                                className="w-40 h-40 rounded-md"
                                data-aos="flip-up" />
                            <div className="flex flex-col gap-2">
                                <h3 data-aos="fade-up" className="text-base">title</h3>
                                <div className="text-base font-bold flex items-center gap-5 flex-col sm:flex-row">
                                    <h1 data-aos="fade-up" >Quanty:</h1>
                                    <div data-aos="fade-up" className="flex items-center gap-2 text-xl font-semibold">
                                        <IoIosAddCircleOutline />
                                        <h3>2</h3>
                                        <IoIosRemoveCircleOutline />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div data-aos="fade-up" className="flex-1 flex flex-col justify-center items-center gap-2">
                            <h2>$52</h2>
                            <p>$546 / each</p>
                        </div>

                        <div data-aos="fade-up" className="remove">
                            <MdDelete
                                size={24}
                                className="hover:text-red-400"

                            />
                        </div>
                    </div>
                    {/* checkout button and home page link */}
                    <div className="flex flex-col gap-5">
                        <Link href="/" data-aos="fade-up" className="flex gap-1 hover:text-red-500">
                            <MdOutlineArrowCircleLeft size={24} />
                            Continue Shopping
                        </Link>
                        <button data-aos="fade-up" className="px-2 py-2 bg-lime-500" >
                            CHECK OUT NOW
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartPage