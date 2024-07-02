import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const Button = () => {
    return (
        <button className='flex items-center gap-1 px-4 py-2 bg-blue-500 rounded-md hover:scale-105 duration-300 transition-all'>
            <FaShoppingCart />
            AddCart
        </button>
    )
}

export default Button