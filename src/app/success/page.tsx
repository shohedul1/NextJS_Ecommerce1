'use client';
import AOS from 'aos';
import "aos/dist/aos.css";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const SuccessPage = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const { orderData } = useSelector((state: any) => state?.shopping);
  console.log('orderData', orderData)
 const router= useRouter();
  return (
    <div className='flex items-center justify-center mx-auto h-screen w-full dark:bg-black dark:text-white'>
      <div className=' px-2'>
        <div className='text-lime-500 font-bold text-center sm:text-3xl'>Congratulations,shohidul</div>
        <div className='flex items-center gap-3 justify-center pt-20'>
          <div className='flex justify-center text-center'>
            <button  onClick={()=>{router.push("/order")}} className='text-white bg-black px-4 py-2 rounded-full hover:text-orange-900	 hover:bg-lime-950 	 hover:scale-110 duration-300 transition-all	'>View Order</button>
          </div>
          <div className='flex justify-center text-center'>
            <button onClick={()=>{router.push("/")}} className='text-white bg-black px-4 py-2 rounded-full hover:text-white hover:bg-red-950	 hover:scale-110 duration-300 transition-all'>Cancel</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SuccessPage