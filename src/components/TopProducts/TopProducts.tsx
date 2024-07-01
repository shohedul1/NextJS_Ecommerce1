import { TopProductsData } from '@/lib/data'
import React from 'react'
import TopCard from './TopCard'

const TopProducts = () => {
    return (
        <div className='dark:bg-black dark:text-white'>
            <div className='container'>
                {/* header section */}
                <div className='text-left mb-24'>
                    <p className='text-sm text-orange-500'>
                        Top Rated Products for you
                    </p>
                    <h1 className='text-3xl font-bold'>Best Product</h1>
                    <p className='text-xs text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
                        asperiores modi Sit asperiores modi
                    </p>

                </div>
                {/* body section */}
                <div className='pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-32 md:gap-5 place-items-center'>

                    {
                        TopProductsData.map((data) => (
                            <TopCard
                                key={data.id}
                                data={data}

                            />
                        ))

                    }

                </div>
            </div>
        </div>
    )
}

export default TopProducts