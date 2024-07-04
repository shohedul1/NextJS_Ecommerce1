'use client'
// pages/[category]/[subcategory].tsx

import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Card from '@/components/Products/Card';


const SubCategoryPage = () => {
  const [work, setWorkList] = useState([]);
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const selectedCategory = 'Top Rated'
  const getWorkList = async () => {
    const response = await fetch(`/api/product/list/${selectedCategory}`);
    const data = await response.json();
    setWorkList(data);
  };

  useEffect(() => {
    getWorkList();
  }, [selectedCategory]);

  return (
    <>
      <div className='pt-14 pb-12 dark:bg-black dark:text-white'>
        <div className='container'>
          {/* header section */}
          <div className='text-center mb-10 max-w-[600px] mx-auto'>
            <p data-aos="fade-up" className='text-sm text-orange-500'>Top selling products for you</p>
            <h1 data-aos="fade-up" className='text-3xl font-bold'>Products</h1>
          </div>
          {/* body section */}
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 place-items-center gap-5'>
              {/* card section */}
              {work.map((data: any) => (
                <Card
                  key={data?.id}
                  data={data}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default SubCategoryPage;
