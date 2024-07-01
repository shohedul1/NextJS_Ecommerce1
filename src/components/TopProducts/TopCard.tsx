import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa'

const TopCard = ({ data }: any) => {
    return (
        <div
            key={data.id}
            data-aos="zoom-in"
            className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-orange-500 hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
        >
            {/* image section */}
            <div className="h-[100px]">
                <Link href={`productDetails/${data.id}`}>
                    <img
                        src={data.img}
                        alt="image"
                        className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                    />
                </Link>
            </div>
            {/* details section */}
            <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                    {data.description}
                </p>
                <button
                    className="bg-orange-500 hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-orange-500"
                >
                    Order Now
                </button>
            </div>
        </div>
    )
}

export default TopCard