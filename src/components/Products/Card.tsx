import React from 'react';
import { FaStar } from "react-icons/fa6";


const Card = ({ data }: any) => {
    return (
        <>
            <div className='space-y-3'>
                <img src={data.img} alt="image" className='w-[300px] h-[220px] object-cover rounded-md' />
                <div>
                    <h3 className='font-semibold'>{data.title}</h3>
                    <p className='text-sm text-gray-600'>{data.color}</p>
                    <div className='flex items-center gap-1'>
                        <FaStar className='text-yellow-400' />
                        <span>{data.rating}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card