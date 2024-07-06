

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
import { useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const [header, setHeader] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { productData } = useSelector((state) => state?.shopping);
  const { orderData } = useSelector((state) => state?.shopping);
  const [openMenu, setOpenMenu] = useState(false);
  const [toggle, setToggle] = useState(false);

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

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleSearch = () => {
    router.push(`/search/${query}`);
    setQuery('');
  };

  const { data: session } = useSession();

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
                data-aos-easing="ease-in-sine"
                className='sm:hidden block absolute top-14 left-[-20px] w-[200px] h-screen bg-white dark:bg-gray-900'>
                <ul className='flex flex-col'>
                  {
                    session ? (
                      <div className='relative cursor-pointer px-4'>
                        <button onClick={() => setOpenMenu((prev) => !prev)} className='w-10 h-10'>
                          <img src={session?.user?.image || "https://res.cloudinary.com/djhjt07rh/image/upload/v1720252708/Ecommerce-Logo-Design-Graphics-32523051-1_utx2uq.jpg"} alt="image" className='w-full h-full rounded-full' />
                        </button>
                        <div className={`absolute z-[9999] top-12 right-0 w-full text-center bg-white dark:bg-gray-900 p-2 rounded-md shadow-md ${openMenu ? "block" : "hidden"}`}>
                          <div className='flex flex-col gap-2'>
                            {
                              orderData.order && (
                                <button onClick={() => { router.push("/order"); setToggle(false); }} className='bg-blue-500 text-white px-2 py-2 rounded-full'>
                                  Order view
                                </button>
                              )
                            }
                            <button className='bg-blue-500 text-white px-2 py-2 rounded-full'
                              onClick={() => signOut({ callbackUrl: "/signIn" })}
                            >logout</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => {
                            router.push("/signIn");
                            setToggle(false);
                          }}
                          className='px-4'>
                          SignIn
                        </button>
                      </div>
                    )
                  }
                  {Menu.map((data) => (
                    <li key={data.id}>
                      <button onClick={() => {
                        router.push(`${data.link}`);
                        setToggle(false);
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
                    <div className='absolute z-50 hidden group-hover:block left-0 w-full bg-white p-2 text-black dark:bg-gray-900 dark:text-white'>
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
                className='w-[150px] group-hover:w-[200px] sm:w-[200px] sm:group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-100 px-4 py-1 focus:outline-none focus:border focus:border-orange-400 dark:text-white dark:bg-gray-800'
              />
              <button onClick={handleSearch}>
                <FaSearch className='absolute top-3 right-2 group-hover:text-orange-500 dark:text-white' />
              </button>
            </div>
            {/* order button */}
            <Link href="/cart" className='relative bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group'>
              <span className='hidden group-hover:block transition-all duration-200'>Order</span>
              <FaCartArrowDown className={'text-xl text-white drop-shadow-sm cursor-pointer'} />
              <p className='bg-white text-orange-600 rounded-full text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 items-center flex justify-center shadow-xl shadow-black'>
                {productData.length || 0}
              </p>
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

          {/* logo */}
          {
            session ? (
              <>
                <div className='relative cursor-pointer group'>
                  <div className='w-10 h-10'>
                    <img src={session?.user?.image || "https://res.cloudinary.com/djhjt07rh/image/upload/v1720252708/Ecommerce-Logo-Design-Graphics-32523051-1_utx2uq.jpg"} alt="image" className='w-full h-full rounded-full' />
                  </div>

                  <div className='absolute z-[9999] top-10 hidden text-center group-hover:block w-[160px] right-[-50px] rounded-md bg-white shadow-md p-2 text-black'>
                    <div className='flex flex-col gap-2'>
                      {
                        orderData.order && (
                          <button onClick={() => { router.push("/order"); setToggle(false); }} className='bg-blue-500 text-white px-2 py-2 rounded-full'>
                            Order view
                          </button>
                        )
                      }
                      <button className='bg-blue-500 text-white px-2 py-2 rounded-full'
                        onClick={() => signOut({ callbackUrl: "/signIn" })}
                      >logout</button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href={"/signIn"}>signIn</Link>
              </>
            )
          }

          {
            header && (
              <Link href="/cart" className='relative bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group'>
                <span className='hidden group-hover:block transition-all duration-200'>Order</span>
                <FaCartArrowDown className={'text-xl text-white drop-shadow-sm cursor-pointer'} />
                <p className='bg-white text-orange-600 rounded-full text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 items-center flex justify-center shadow-xl shadow-black'>
                  {productData.length || 0}
                </p>
              </Link>
            )
          }

        </ul>
      </div>

    </div>
  );
}

export default Navbar;









