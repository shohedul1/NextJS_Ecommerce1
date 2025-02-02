
'use client';
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { MdDelete, MdOutlineArrowCircleLeft } from 'react-icons/md';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorite, resetFavorite } from '@/lib/redux/shoppingSlice';

const Wishlist = () => {
  const { favoriteData } = useSelector((state: any) => state?.shopping);
  const dispatch = useDispatch();
  // console.log('favoriteData', favoriteData);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className='py-10 bg-gray-200 dark:bg-black dark:text-white'>
      <div className='flex flex-col container'>
        <div className="flex flex-col items-center gap-5 pb-2">
          <h1
            data-aos="fade-up"
            className="text-xl font-bold">Your Wishlist</h1>
        </div>
        <div className="flex flex-col gap-8">
          {/* product details */}
          {
            favoriteData.length > 0 ? (
              <>
                {
                  favoriteData.map((product: any) => (
                    <div key={product.id} className="flex items-center flex-col md:flex-row gap-5">
                      {/* product img and tittle quanty heading  */}
                      <div className="flex gap-8 sm:gap-20 flex-col md:flex-row items-center text-xs">
                        <img
                          src={product.img}
                          alt="product"
                          className="w-40 h-40 rounded-md"
                          data-aos="flip-up" />
                        <div className="flex flex-col gap-2">
                          <h3 data-aos="fade-up" className="text-base">{product.title.substring(0,15)}</h3>
                          <div className="text-base font-bold flex items-center gap-5 flex-col sm:flex-row">
                            <h1 data-aos="fade-up" >Quantity:</h1>
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
                          onClick={() => dispatch(deleteFavorite(product.id))}
                        />
                      </div>
                    </div>
                  ))
                }
              </>
            ) : (
              <div className='text-center font-bold text-xl'>Empty page</div>
            )
          }

          {/* checkout button and home page link */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-end mt-2">
              {
                favoriteData.length > 0 && (
                  <button onClick={() => dispatch(resetFavorite())}
                    className="bg-red-500 rounded-md text-base font-semibold text-slate-100 py-2 px-6 hover:bg-red-700 hover:text-white duration-200">
                    Reset Wishlist
                  </button>
                )
              }
            </div>
            <Link href="/" data-aos="fade-up" className="flex gap-1 hover:text-red-500">
              <MdOutlineArrowCircleLeft size={24} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist;



