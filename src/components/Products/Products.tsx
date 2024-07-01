import React from 'react'
import Card from './Card'
import { ProductsData } from '@/lib/data'

const Products = () => {
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
                        {
                            ProductsData.map((data) => (
                                <Card
                                    key={data.id}
                                    data={data}
                                />
                            ))
                        }
                    </div>
                    {/* view all button */}
                    <div className='flex justify-center'>
                        <button className='text-center mt-10 cursor-pointer bg-orange-500 text-white py-1 px-5 rounded-md'>
                            View All Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products