
'use client';
import React, { useState, useEffect } from 'react';

const DarkMode = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const root = document.documentElement;
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const isChecked = theme === 'dark';

    const handleCheckboxChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <label className='flex cursor-pointer select-none items-center'>
            <div className='relative'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='sr-only'
                />
                <div
                    className={`box block h-8 w-14 rounded-full ${isChecked ? 'bg-orange-700' : 'bg-gray-600'
                        }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${isChecked ? 'translate-x-full' : ''
                        }`}
                ></div>
            </div>
        </label>
    );
};

export default DarkMode;
