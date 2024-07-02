'use client';
import React, { useState } from 'react'
import { MdFavorite } from 'react-icons/md'

const Favoraties = () => {
    const [love, setLove] = useState(true);
    const handleClick = () => {
        setLove(!love);
    }

    return (
        <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={handleClick}
        >
            <div className='flex items-center gap-1 group'>
                <MdFavorite className={love ? "text-black" : "text-red-500"} size={24} />
                <p className={'group-hover:text-red-500'}>Save</p>
            </div>
        </div>
    )
}

export default Favoraties;
