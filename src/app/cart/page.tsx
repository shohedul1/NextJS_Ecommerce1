

'use client';
import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { MdDelete, MdOutlineArrowCircleLeft } from 'react-icons/md';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteProduct, increaseQuantity, resetCart, saveOrder } from '@/lib/redux/shoppingSlice';
import { useSession } from 'next-auth/react';
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const { productData } = useSelector((state: any) => state?.shopping);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(() => {
        let amt = 0;
        productData.map((item: any) => {
            amt += item?.price * item?.quanty
            return;
        });
        setTotalAmt(amt);
    }, [productData]);

    // Stripe Payment Start here
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const { data: session } = useSession();

    const handleCheckout = async () => {
        setLoading(true);
        const stripe = await stripePromise;
        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: productData,
                email: session?.user?.email,
            }),
        });
        const data = await response.json();

        if (response.ok) {
            await dispatch(saveOrder({ order: productData, id: data.id }));
            stripe?.redirectToCheckout({ sessionId: data.id });
            dispatch(resetCart());
            setLoading(false);
        } else {
            setLoading(false);
            throw new Error("Failed to create Stripe Payment");
        }
    };
    // Stripe Payment end here
    return (
        <div className='py-10 bg-gray-200 dark:bg-black dark:text-white'>
            <div className='flex flex-col container'>
                <div className="flex flex-col items-center gap-5 pb-2">
                    <h1
                        data-aos="fade-up"
                        className="text-xl font-bold">Your Cart</h1>
                    <h2 data-aos="fade-up" className="text-gray-500">
                        Subtotal: <span className="text-gray-600">${totalAmt}</span>
                    </h2>
                </div>
                <div className="flex flex-col gap-8">
                    {/* product details */}
                    {
                        productData.map((product: any) => (
                            <div key={product.id} className="flex items-center flex-col md:flex-row gap-5">
                                {/* product img and title quantity heading  */}
                                <div className="flex gap-8 sm:gap-20 flex-col md:flex-row items-center text-xs">
                                    <img
                                        src={product.img}
                                        alt="product"
                                        className="w-40 h-40 rounded-md"
                                        data-aos="flip-up" />
                                    <div className="flex flex-col gap-2">
                                        <h3 data-aos="fade-up" className="text-base">{product.title}</h3>
                                        <div className="text-base font-bold flex items-center gap-5 flex-col sm:flex-row">
                                            <h1 data-aos="fade-up">Quantity:</h1>
                                            <div data-aos="fade-up" className="flex items-center gap-2 text-xl font-semibold">
                                                <IoIosAddCircleOutline
                                                    onClick={() => dispatch(decreaseQuantity(product))}
                                                />
                                                <h3>{product.quanty}</h3>
                                                <IoIosRemoveCircleOutline
                                                    onClick={() => dispatch(increaseQuantity(product))}
                                                />
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
                                        onClick={() => dispatch(deleteProduct(product?.id))}
                                    />
                                </div>
                            </div>
                        ))
                    }

                    {/* checkout button and home page link */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-end mt-2">
                            {
                                productData.length > 0 && (
                                    <button onClick={() => dispatch(resetCart())}
                                        className="bg-red-500 rounded-md text-base font-semibold text-slate-100 py-2 px-6 hover:bg-red-700 hover:text-white duration-200">
                                        Reset Cart
                                    </button>
                                )
                            }
                        </div>
                        <Link href="/" data-aos="fade-up" className="flex gap-1 hover:text-red-500">
                            <MdOutlineArrowCircleLeft size={24} />
                            Continue Shopping
                        </Link>

                        {
                            productData.length > 0 && (
                                <>
                                    {session ? (
                                        <button onClick={handleCheckout} data-aos="fade-up" className="px-2 py-2 rounded-md hover:bg-lime-900 hover:text-white bg-lime-500 text-black font-bold text-xl">
                                            {loading ? 'SUBMIT NOW..' : 'CHECK OUT NOW'}
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={() => { router.push("/signup") }} data-aos="fade-up" className="px-2 py-2 rounded-md hover:bg-lime-900 hover:text-white bg-lime-500 text-black font-bold text-xl">
                                                CHECK OUT NOW
                                            </button>
                                            <p>Please login to continue</p>
                                        </>
                                    )}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;



