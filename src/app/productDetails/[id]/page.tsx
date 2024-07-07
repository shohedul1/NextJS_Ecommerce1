'use client';
import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { MdArrowBackIosNew, MdArrowForwardIos, MdFavorite } from 'react-icons/md';
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToFavorite } from '@/lib/redux/shoppingSlice';
import { toast } from 'react-toastify';
import Notification from '@/components/Notification/Notification';
import { RootState } from '@/lib/redux/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface CartDetailPageProps {
  params: {
    id: string;
  };
}

interface Product {
  id: number;
  img: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  color: string;
  price: string;
  quanty: number;
  aosDelay: string;
  workPhotoPaths: {
    id: string;
    url: string;
  }[];
}

const CartDetailPage: React.FC<CartDetailPageProps> = ({ params }) => {
  const workId = params.id;
  const [work, setWork] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const favoriteData = useSelector((state: RootState) => state.shopping.favoriteData);
  const [love, setLove] = useState(false);
  const { data: session } = useSession();
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

  useEffect(() => {
    const getWorkDetails = async () => {
      if (!workId) return;
      try {
        const response = await fetch(`/api/product/${workId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWork(data);
        setLove(favoriteData.some((item: Product) => item.id === data.id));
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getWorkDetails();
  }, [workId, favoriteData]);

  /* SLIDER FOR PHOTOS */
  const [currentIndex, setCurrentIndex] = useState(0);
  /* SHOW MORE PHOTOS */
  const [visiblePhotos, setVisiblePhotos] = useState(5);
  const loadMorePhotos = () => {
    if (work?.workPhotoPaths) {
      setVisiblePhotos(work.workPhotoPaths.length);
    }
  };

  /* SELECT PHOTO TO SHOW */
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const goToNextSlide = () => {
    if (work?.workPhotoPaths) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length);
    }
  };

  const goToPrevSlide = () => {
    if (work?.workPhotoPaths) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + work.workPhotoPaths.length) % work.workPhotoPaths.length);
    }
  };

  const handleSelectedPhoto = (index: number) => {
    setSelectedPhoto(index);
    setCurrentIndex(index);
  };

  const roundedRating = Math.round(work?.rating || 0);
  const stars = Array(roundedRating).fill(null).map((_, index) => (
    <FaStar key={index} />
  ));

  const handleFavoriteClick = () => {
    if (!session) {
      router.push("/signup");
    } else {
      if (work) {
        setLove(!love);
        dispatch(addToFavorite(work));
        if (favoriteData.some((favoriteItem: Product) => favoriteItem.id === work.id)) {
          toast.error(`${work.title.substring(0, 15)} removed from favorites!`);
        } else {
          toast.success(`${work.title.substring(0, 15)} added to favorites!`);
        }
      }
    }
  };

  return (
    <>
      <div>
        {work && (
          <div className='pt-10 pb-20 dark:bg-black dark:text-white'>
            <div className='container'>
              {/* header section */}
              <div className='flex items-center justify-between sm:flex-col sm:items-start sm:gap-2.5'>
                <h1 data-aos="fade-up">{work.color}</h1>
                {/* favoriteIcons */}
                <div data-aos="fade-up">
                  <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={handleFavoriteClick}
                  >
                    <div className='flex items-center gap-1 group'>
                      <MdFavorite className={love ? "text-red-500" : "text-black dark:text-white"} size={24} />
                      <p className={'group-hover:text-red-500'}>Save</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* body section */}
              <div data-aos="flip-left" className='max-w-[800px] overflow-hidden rounded-[10px] my-10'>
                {work.workPhotoPaths && (
                  <div className='flex transition-transform duration-500 ease-in'
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {work.workPhotoPaths.map((photo, index) => (
                      <div key={photo.id}
                        className="relative flex-none w-full h-auto flex items-center" >
                        <img src={photo.url} alt="work" className="w-full h-[500px] object-fill" />
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
              {work.workPhotoPaths && (
                <div data-aos="fade-up" className="flex flex-wrap gap-2.5">
                  {work.workPhotoPaths.slice(0, visiblePhotos).map((photo, index) => (
                    <img
                      src={photo.url}
                      alt="work-demo"
                      key={photo.id}
                      onClick={() => handleSelectedPhoto(index)}
                      className={`cursor-pointer w-36 h-36 ${selectedPhoto === index ? "border-2 border-black border-solid" : ""}`}
                    />
                  ))}
                  {visiblePhotos < work.workPhotoPaths.length && (
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
                  <h1 data-aos="fade-up">{work.title}</h1>
                  <h1 data-aos="fade-up" className='flex gap-1 text-yellow-500'>
                    {stars}
                  </h1>
                </div>
                <h1 data-aos="fade-up" className='text-5xl font-bold'>
                  ${work.price}
                </h1>
                <p data-aos="fade-up" className="text-xl">{work.description}</p>
                {/* card add button */}
                <div data-aos="fade-up">
                  <button
                    onClick={() => {
                      dispatch(addToCart(work));
                      toast.success(`Added ${work.title.substring(0, 15)} to cart`, {
                        position: 'top-center'
                      });
                    }}
                    className='flex items-center gap-1 px-4 py-2 bg-blue-500 rounded-md hover:scale-105 duration-300 transition-all'>
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Notification />
    </>
  );
}

export default CartDetailPage;

