// 'use client';
// import React, { useState } from 'react'
// import Card from './Card'
// import { ProductsData } from '@/lib/data'

// const Products = () => {
//     const [visiblePhotos, setVisiblePhotos] = useState(3);
//     const loadMorePhotos = () => {
//         if (ProductsData.length) {
//             setVisiblePhotos(ProductsData.length);
//         }
//     };

//     return (
//         <div className='pt-14 pb-12 dark:bg-black dark:text-white'>
//             <div className='container'>
//                 {/* header section */}
//                 <div className='text-center mb-10 max-w-[600px] mx-auto'>
//                     <p data-aos="fade-up" className='text-sm text-orange-500'>Top selling products for you</p>
//                     <h1 data-aos="fade-up" className='text-3xl font-bold'>Products</h1>
//                 </div>
//                 {/* body section */}
//                 <div>
//                     <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 place-items-center gap-5'>
//                         {/* card section */}
//                         {
//                             ProductsData.slice(0, visiblePhotos).map((data) => (
//                                 <Card
//                                     key={data.id}
//                                     data={data}
//                                 />
//                             ))
//                         }
//                     </div>
//                     {visiblePhotos < ProductsData.length && (
//                         <div className='flex justify-center'>
//                             <button
//                                 onClick={loadMorePhotos}
//                                 className='text-center mt-10 cursor-pointer bg-orange-500 text-white py-1 px-5 rounded-md'>
//                                 View All Button
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default Products

'use client';
import React, { useState } from 'react';
import Card from './Card';
import { ProductsData } from '@/lib/data';

const Products = () => {
    const [visiblePhotos, setVisiblePhotos] = useState(2);

    const loadMorePhotos = () => {
        setVisiblePhotos(prevVisiblePhotos => Math.min(prevVisiblePhotos + 1, ProductsData.length));
    };

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
                        {ProductsData.slice(0, visiblePhotos).map((data) => (
                            <Card
                                key={data.id}
                                data={data}
                            />
                        ))}
                    </div>
                    {visiblePhotos < ProductsData.length && (
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
