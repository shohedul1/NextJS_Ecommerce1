'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GiShoppingBag } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import DarkMode from './DarkMode';
import { DropdownLinks, Menu } from '@/lib/data';
import { FaCaretDown } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [header, setHeader] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState('');
  console.log(query);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [toggle, setToggle] = useState(false)

  const handleClick = () => {
    setToggle(!toggle)
  }



  return (
    <div className={`${header ? "shadow-md" : ""} bg-white dark:bg-gray-900 dark:text-white sticky top-0 z-50`}>
      {/* upper Navbar */}
      <div className={`bg-blue-400 dark:bg-red-950 py-4 ${header ? 'sm:hidden' : 'block'}`}>
        <div className='container flex justify-between items-center'>
          <div className='relative'>
            <Link href={"/"} className='items-center gap-1 font-bold text-2xl hidden sm:flex dark:text-white'>
              <GiShoppingBag className='text-orange-700' />
              Shopsy
            </Link>
            {
              toggle ? (
                <button onClick={handleClick} className='sm:hidden block'>
                  <IoMdClose className='w-10 h-10' />
                </button>
              ) : (
                <button onClick={handleClick} className='sm:hidden block'>
                  <IoMdMenu className='w-10 h-10' />
                </button>
              )
            }
            {toggle && (
              <div
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine" className='sm:hidden block absolute top-14 left-[-20px] w-[200px] h-screen bg-white dark:bg-gray-900'>
                <ul className='flex flex-col'>
                  {Menu.map((data) => (
                    <li key={data.id}>
                      <button onClick={() => {
                        router.push(`${data.link}`)
                        setToggle(!toggle);
                      }} className='block px-4 py-2 hover:text-orange-500 dark:hover:text-orange-500 duration-200 dark:text-white'>
                        {data.name}
                      </button>
                    </li>
                  ))}
                  <li className='relative group cursor-pointer'>
                    <a href='#' className='flex items-center gap-1.5 px-4 py-2'>
                      Trending
                      <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' />
                    </a>
                    <div className='absolute z-50 hidden group-hover:block left-0 w-full bg-white  p-2 text-black dark:bg-gray-900 dark:text-white'>
                      <ul>
                        {DropdownLinks.map((data) => (
                          <li key={data.id}>
                            <a href={data.link} className='block px-4 py-2 hover:bg-orange-400 dark:hover:bg-orange-600'>
                              {data.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* search bar and order button and dark button */}
          <div className='flex justify-between gap-2 sm:gap-4 items-center'>
            {/* search input and button */}
            <div className='group relative'>
              <input
                type="text"
                placeholder='search...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-[150px] group-hover:w-[200px]  sm:w-[200px] sm:group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-100 px-4 py-1 focus:outline-none focus:border focus:border-orange-400 dark:text-white dark:bg-gray-800'
              />
              <Link href={`/search/${query}`}>
                <FaSearch className='absolute top-3 right-2 group-hover:text-orange-500 dark:text-white' />
              </Link>
            </div>
            {/* order button */}
            <Link href="/cart" className='bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group'>
              <span className='hidden group-hover:block transition-all duration-200'>Order</span>
              <FaCartArrowDown className={'text-xl text-white drop-shadow-sm cursor-pointer'} />
            </Link>
            {/* darkTheme */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* lower Navbar */}
      <div
        data-aos="zoom-out"
        data-aos-duration="500"
        data-aos-delay="100" className={"flex justify-center"}>
        <ul className='sm:flex hidden items-center gap-4 py-2'>
          {
            Menu.map((data) => (
              <li key={data.id}>
                <Link href={data.link} className='inline-block px-4 hover:text-orange-500 duration-200'>
                  {data.name}
                </Link>
              </li>
            ))
          }
          {/* simple Dropdown and link  */}
          <li className='relative group cursor-pointer'>
            <a href='#' className='flex items-center gap-1.5 '>
              Trending
              <span>
                <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' />
              </span>
            </a>
            <div className='absolute z-[9999] hidden group-hover:block w-[160px] rounded-md bg-white shadow-md p-2 text-black'>
              <ul>
                {
                  DropdownLinks.map((data) => (
                    <li key={data.id}>
                      <a href={data.link}
                        className='inline-block w-full rounded-md hover:bg-orange-400'
                      >
                        {data.name}
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Navbar;





