

'use client';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Products = () => {
    const [visiblePhotos, setVisiblePhotos] = useState(12);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [workList, setWorkList] = useState([]);

    const loadMorePhotos = () => {
        setVisiblePhotos(prevVisiblePhotos => Math.min(prevVisiblePhotos + 12, workList.length));
    };




    const getWorkList = async () => {
        const response = await fetch(`/api/product/list/${selectedCategory}`);
        const data = await response.json();
        setWorkList(data);
    };

    useEffect(() => {
        getWorkList();
    }, [selectedCategory]);

    // console.log(workList);

    return (
        <div className='pt-14 pb-12 dark:bg-black dark:text-white'>
            <div className='container'>
                {/* header section */}
                <div className='text-center mb-10 max-w-[600px] mx-auto'>
                    <p data-aos="fade-up" className='text-sm text-orange-500'>Top selling products for you</p>
                    <h1 data-aos="fade-up" className='text-3xl font-bold'>Products</h1>
                </div>
                {/* body section */}
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 place-items-center gap-5'>
                        {/* card section */}
                        {workList.slice(0, visiblePhotos).map((data: any) => (
                            <Card
                                key={data?.id}
                                data={data}
                            />
                        ))}
                    </div>
                    {visiblePhotos < workList.length && (
                        <div className='flex justify-center'>
                            <button
                                onClick={loadMorePhotos}
                                className='text-center mt-10 cursor-pointer bg-orange-500 text-white py-1 px-5 rounded-md'>
                                View More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;
