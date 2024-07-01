import React from 'react'

const TestimonialsData = ({ data }: any) => {
    return (
        <div className='my-6'>
            <div className='flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-yellow-100 bg-orange-500 relative'>
                <div className='mb-4'>
                    <img src={data.img} alt="image"
                        className='rounded-full w-20 h-20'
                    />
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <div className='space-y-3'>
                        <p className='text-xs text-gray-500'>
                            {data.text}
                        </p>
                        <h1 className='text-xl font-bold text-gray-300 dark:text-light'>{data.name}</h1>
                    </div>
                </div>
                <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                </p>
            </div>
        </div>
    )
}

export default TestimonialsData