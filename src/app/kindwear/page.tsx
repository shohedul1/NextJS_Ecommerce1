'use client';
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const KindWear = () => {
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
    <div>KindWear</div>
  )
}

export default KindWear