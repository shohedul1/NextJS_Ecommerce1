

'use client';
import React, { useEffect, useState } from 'react';
import TopCard from './TopCard';

const TopProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [workList, setWorkList] = useState([]);

    const getWorkList = async () => {
        const response = await fetch(`/api/product/list/${selectedCategory}`);
        const data = await response.json();
        setWorkList(data);
    };

    useEffect(() => {
        getWorkList();
    }, [selectedCategory]);

    // Function to shuffle array
    const shuffleArray = (array: any) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Function to get three random items from array
    const getRandomItems = (array: any, count: any) => {
        const shuffledArray = shuffleArray([...array]);
        return shuffledArray.slice(0, count);
    };

    const randomProducts = getRandomItems(workList, 3);

    return (
        <div className='dark:bg-black dark:text-white'>
            <div className='container'>
                {/* header section */}
                <div className='text-left mb-24'>
                    <p data-aos="fade-up" className='text-sm text-orange-500'>
                        Top Rated Products for you
                    </p>
                    <h1 data-aos="fade-up" className='text-3xl font-bold'>Best Product</h1>
                    <p data-aos="fade-up" className='text-xs text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
                        asperiores modi Sit asperiores modi
                    </p>

                </div>
                {/* body section */}
                <div
                    data-aos="zoom-in"
                    className='pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-32 md:gap-5 place-items-center'>

                    {
                        randomProducts.map((data: any) => (
                            <TopCard
                                key={data.id}
                                data={data}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default TopProducts;
