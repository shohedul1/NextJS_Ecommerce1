'use client';
import { resetOrder } from '@/lib/redux/shoppingSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const OrderPage = () => {
    // const router = useRouter();
    const dispatch = useDispatch();
    // const { data: session } = useSession();
    const { orderData } = useSelector((state: any) => state?.shopping);



    return (
        <div className='flex flex-col gap-2 items-center justify-center py-5 dark:bg-black dark:text-white '>
            {
                orderData?.order?.map((product: any) => (
                    <div key={product.id} className='flex bg-red-50 justify-between container'>

                        <div className="flex gap-8 sm:gap-20 flex-col md:flex-row items-center text-xs">
                            <img
                                src={product.img}
                                alt="product"
                                className="w-40 h-40 rounded-md"
                                data-aos="flip-up" />
                            <div className="flex flex-col gap-2">
                                <h3 data-aos="fade-up" className="text-base">{product?.title.substring(0, 15)}</h3>
                                <div className="text-base font-bold flex items-center gap-5 flex-col sm:flex-row">
                                    <h1 data-aos="fade-up" >Quanty:</h1>
                                    <div data-aos="fade-up" className="flex items-center gap-2 text-xl font-semibold">
                                        <h3>{product?.quanty}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-up" className="flex-1 flex flex-col justify-center items-center gap-2">
                            <h2>${product?.price}500</h2>
                        </div>


                    </div>
                ))
            }

            <div className="flex items-center justify-end mt-2">
                <button onClick={() => dispatch(resetOrder())}
                    className="bg-red-500 rounded-md text-base font-semibold text-slate-100 py-2 px-6 hover:bg-red-700 hover:text-white duration-200">
                    reset cart
                </button>
            </div>



        </div>


    )
}

export default OrderPage