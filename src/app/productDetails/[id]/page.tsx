'use client';
import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { ProductsData } from '@/lib/data';
import Favoraties from './components/Favoraties/Favoraties';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import Button from './components/Button/Button';
import { FaStar } from "react-icons/fa";


interface CartDetailPageProps {
  params: {
    id: string;
  };
}

const CartDetailPage: React.FC<CartDetailPageProps> = ({ params }) => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const data = ProductsData?.find((item: any) => item.id.toString() === params.id.toString());
  console.log('Found data:', data);

  /* SLIDER FOR PHOTOS */
  const [currentIndex, setCurrentIndex] = useState(0);
  /* SHOW MORE PHOTOS */
  const [visiblePhotos, setVisiblePhotos] = useState(5);
  const loadMorePhotos = () => {
    if (data?.workPhotoPaths) {
      setVisiblePhotos(data.workPhotoPaths.length);
    }
  };

  /* SELECT PHOTO TO SHOW */
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const goToNextSlide = () => {
    if (data?.workPhotoPaths) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.workPhotoPaths.length);
    }
  };

  const goToPrevSlide = () => {
    if (data?.workPhotoPaths) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + data.workPhotoPaths.length) % data.workPhotoPaths.length);
    }
  };

  const handleSelectedPhoto = (index: any) => {
    setSelectedPhoto(index);
    setCurrentIndex(index);
  };
  const roundedRating = Math.round(data?.rating || 0);
  const stars = Array(roundedRating).fill(<FaStar />);
  return (
    <>
      <div>
        {data ? (
          <div className='pt-10 pb-20 dark:bg-black dark:text-white'>
            <div className='container'>
              {/* header section */}
              <div className='flex items-center justify-between sm:flex-col sm:items-start sm:gap-2.5'>
                <h1 data-aos="fade-up">{data.color}</h1>
                {/* favoriteIcons */}
                <div data-aos="fade-up">
                  <Favoraties />
                </div>
              </div>
              {/* body section */}
              <div data-aos="flip-left" className='max-w-[800px] overflow-hidden rounded-[10px] my-10'>
                {data.workPhotoPaths && (
                  <div className='flex transition-transform duration-500 ease-in'
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {data.workPhotoPaths.map((photo, index) => (
                      <div className="relative flex-none w-full h-auto flex items-center" key={index}>
                        <img src={photo.url} alt="work" className="w-full h-full" />
                        <div
                          className="hover:bg-white left-2.5 absolute top-1/2 transform -translate-y-1/2 p-[6px] rounded-full border-none cursor-pointer flex items-center justify-center bg-white/70 z-[99]"
                          onClick={goToPrevSlide}
                        >
                          <MdArrowBackIosNew />
                        </div>
                        <div
                          className="absolute bg-white right-2.5 top-1/2 transform -translate-y-1/2 p-[6px] rounded-full border-none cursor-pointer flex items-center justify-center bg-white/70 z-[99]"
                          onClick={goToNextSlide}
                        >
                          <MdArrowForwardIos />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {data.workPhotoPaths && (
                <div data-aos="fade-up" className="flex flex-wrap gap-2.5">
                  {data.workPhotoPaths.slice(0, visiblePhotos).map((photo, index) => (
                    <img
                      src={photo.url}
                      alt="work-demo"
                      key={index}
                      onClick={() => handleSelectedPhoto(index)}
                      className={`cursor-pointer w-36 h-36 ${selectedPhoto === index ? "border-2 border-black border-solid" : ""}`}
                    />
                  ))}
                  {visiblePhotos < data.workPhotoPaths.length && (
                    <div className='flex flex-col gap-5 items-center justify-center cursor-pointer '>
                      <button
                        className="px-4 py-2 bg-blue-500 rounded-md"
                        onClick={loadMorePhotos}>
                        Show More
                      </button>
                    </div>

                  )}
                </div>
              )}
              <hr className='mt-5' />
              <hr className='mt-1' />
              <div className='pt-5 flex flex-col gap-5'>
                <h3 data-aos="fade-up" className='text-3xl'>About this product</h3>
                <div>
                  <h1 data-aos="fade-up">{data.title}</h1>
                  <h1 data-aos="fade-up" className='flex gap-1 text-yellow-500'>
                    {stars}
                  </h1>
                </div>
                <h1 data-aos="fade-up" className='text-5xl font-bold'>
                  ${data.price}
                </h1>
                <p data-aos="fade-up" className="text-xl">{data.description}</p>
                {/* card add button */}
                <div data-aos="fade-up">
                  <Button />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </>
  );
}

export default CartDetailPage;
