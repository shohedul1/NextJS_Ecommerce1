import React from 'react';
const BannerImg = {
    backgroundImage: 'url(https://res.cloudinary.com/djhjt07rh/image/upload/v1719813696/Rectangle_26_2_udt6tz.png)',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
};

const Subscribe = () => {
    return (
        <div style={BannerImg}>
            <div className='container backdrop-blur-sm py-10'>
                <div className='space-y-6 max-w-[650px] mx-auto'>
                    <h1 className='text-2xl text-center sm:text-left sm:text-4xl font-semibold'>
                        Get Notified About New Products
                    </h1>
                    <form className='flex flex-col gap-5'>
                        <input
                            type="text"
                            placeholder='Enter your email'
                            className='w-full p-3 focus:outline-none rounded-md'
                        />
                       <div>
                       <button className='px-4 py-2 bg-blue-600 rounded-md text-white hover:scale-105 transition-all duration-300 dark:bg-black dark:text-white'>
                            Subscribe
                        </button>
                       </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Subscribe