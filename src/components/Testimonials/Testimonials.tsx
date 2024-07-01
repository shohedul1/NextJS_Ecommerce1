'use client';
import { TestimonialData } from '@/lib/data';
import React from 'react'
import Slider from 'react-slick'
import TestimonialsData from './TestimonialsData';

const Testimonials = () => {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='py-10 pb-10 dark:bg-black dark:text-white text-black'>
            <div className='container'>
                {/* header section */}
                <div className='text-center mb-10 max-w-[600px] mx-auto'>
                    <p className='text-orange-500 text-sm'>
                        What our customers are saying
                    </p>
                    <h1 className='text-3xl text-gray-400 font-bold'>
                        Testimonials
                    </h1>
                    <p className='text-xs text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit asperiores modical
                    </p>
                </div>
                {/* body seciton */}
                <div>
                    <Slider {...settings}>
                        {
                            TestimonialData.map((data) => (
                                <TestimonialsData
                                    key={data.id}
                                    data={data}
                                />
                            ))
                        }
                    </Slider>

                </div>
            </div>
        </div>
    )
}

export default Testimonials