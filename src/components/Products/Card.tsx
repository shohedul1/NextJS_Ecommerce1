import Link from 'next/link';
import React from 'react';
import { FaStar } from "react-icons/fa6";


const Card = ({ data }: any) => {
    return (
        <>

            <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className='space-y-3'>
                <Link href={`productDetails/${data.id}`}>
                    <img src={data.img} alt="image" className='w-[300px] h-[220px] object-cover rounded-md' />
                </Link>
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