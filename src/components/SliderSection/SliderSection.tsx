


'use client';
import { addToCart } from '@/lib/redux/shoppingSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import Notification from '../Notification/Notification';

const SliderSection = () => {

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [workList, setWorkList] = useState([]);
    const dispatch = useDispatch();

    const shuffleArray = (array:any) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getWorkList = async () => {
        const response = await fetch(`/api/product/list/${selectedCategory}`);
        const data = await response.json();
        setWorkList(shuffleArray(data));
    };

    useEffect(() => {
        getWorkList();
    }, [selectedCategory]);

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

    return (
        <>
            <div className="relative overflow-hidden min-h-[550px] sm:min-h-[600px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
                {/* background pattern */}
                <div className="h-[700px] w-[700px] bg-blue-400 absolute dark:bg-red-950 -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
                {/* hero section */}
                {
                    workList.length > 0 && (
                        <div className="container pb-8 sm:pb-0">
                            <Slider {...settings}>
                                {workList.map((data:any) => (
                                    <div key={data.id}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2">
                                            {/* text content section */}
                                            <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                                                <h1
                                                    data-aos="zoom-out"
                                                    data-aos-duration="500"
                                                    data-aos-once="true"
                                                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                                                >
                                                    {data.title.substring(0, 15)}
                                                </h1>
                                                <p
                                                    data-aos="fade-up"
                                                    data-aos-duration="500"
                                                    data-aos-delay="100"
                                                    className="text-sm"
                                                >
                                                    {data.description}
                                                </p>
                                                <div
                                                    data-aos="fade-up"
                                                    data-aos-duration="500"
                                                    data-aos-delay="300"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            dispatch(addToCart(data));
                                                            toast.success(`add to ${data.title.substring(0, 15)}`, {
                                                                position: 'top-center'
                                                            });
                                                        }}
                                                        className="bg-gradient-to-r from-orange-500 to-orange-700 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                                                    >
                                                        Order Now
                                                    </button>
                                                </div>
                                            </div>
                                            {/* image section */}
                                            <div className="order-1 sm:order-2">
                                                <div
                                                    data-aos="zoom-in"
                                                    data-aos-once="true"
                                                    className="relative z-10"
                                                >
                                                    <img
                                                        src={data.img}
                                                        alt={data.title}
                                                        className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:hover:scale-105  object-contain mx-auto"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )
                }
            </div>
            <Notification />
        </>
    );
};

export default SliderSection;
