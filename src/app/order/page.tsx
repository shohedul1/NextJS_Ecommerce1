'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { deleteOrderProduct, resetOrder } from '@/lib/redux/shoppingSlice';
import { MdDelete, MdOutlineArrowCircleLeft } from 'react-icons/md';


const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orderData } = useSelector((state: any) => state?.shopping);
    // console.log(orderData);
    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(() => {
        let amt = 0;
        orderData?.order?.map((item: any) => {
            amt += item.price * item.quanty;
        });
        setTotalAmt(amt);
    }, [orderData.order]);
    return (
        <>
            <div className=' py-10 bg-gray-200 dark:bg-black dark:text-white'>
                {
                    orderData?.order?.length > 0 ? (

                        <div className='flex flex-col container'>
                            <div className="flex flex-col items-center gap-5 pb-2">
                                <h1
                                    data-aos="fade-up"
                                    className="text-xl font-bold">Your order</h1>
                                <h2 data-aos="fade-up" className="text-gray-500">
                                    Subtotal: <span className="text-gray-600">${totalAmt}</span>
                                </h2>
                            </div>
                            <div className="flex flex-col gap-8">
                                {/* product details */}
                                {
                                    orderData?.order.map((product: any) => (
                                        <div key={product.id} className="flex items-center flex-col md:flex-row gap-5">
                                            {/* product img and tittle quanty heading  */}
                                            <div className="flex gap-8 sm:gap-20 flex-col md:flex-row items-center text-xs">
                                                <img
                                                    src={product.img}
                                                    alt="product"
                                                    className="w-40 h-40 rounded-md"
                                                    data-aos="flip-up" />
                                                <div className="flex flex-col gap-2">
                                                    <h3 data-aos="fade-up" className="text-base">{product.title}</h3>
                                                    <div className="text-base font-bold flex items-center gap-5 flex-col sm:flex-row">
                                                        <h1 data-aos="fade-up" >Quanty:</h1>
                                                        <div data-aos="fade-up" className="flex items-center gap-2 text-xl font-semibold">
                                                            <h3>{product.quanty}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div data-aos="fade-up" className="flex-1 flex flex-col justify-center items-center gap-2">
                                                <h2>${product.price}</h2>
                                                <p>${product.price * product.quanty}</p>
                                            </div>

                                            <div data-aos="fade-up" className="remove">
                                                <MdDelete
                                                    size={24}
                                                    className="hover:text-red-400"
                                                    onClick={() => dispatch(deleteOrderProduct(product?.id))}
                                                />
                                            </div>
                                        </div>

                                    ))
                                }

                                {/* checkout button and home page link */}
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center justify-end mt-2">
                                        <button onClick={() => dispatch(resetOrder())}
                                            className="bg-red-500 rounded-md text-base font-semibold text-slate-100 py-2 px-6 hover:bg-red-700 hover:text-white duration-200">
                                            reset cart
                                        </button>
                                    </div>
                                    <Link href="/" data-aos="fade-up" className="flex gap-1 hover:text-red-500">
                                        <MdOutlineArrowCircleLeft size={24} />
                                        Continue Shopping
                                    </Link>


                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='py-10 bg-white text-black text-2xl text-center container rounded-md'>
                            <p>Nothing to show</p>
                            <Link href={"/"}>
                                <button className="bg-black mt-2 text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300">Continue Shopping</button>
                            </Link>
                        </div>

                    )
                }

            </div>
        </>
    )
}

export default OrderDetails;

