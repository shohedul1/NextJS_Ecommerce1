'use client';
import Banner from "@/components/Banner/Banner";
import Products from "@/components/Products/Products";
import SliderSection from "@/components/SliderSection/SliderSection";
import Subscribe from "@/components/Subscribe/Subscribe";
import Testimonials from "@/components/Testimonials/Testimonials";
import TopProducts from "@/components/TopProducts/TopProducts";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
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
    <div>
      <SliderSection />
      <Products />
      <TopProducts />
      <Banner />
      <Subscribe />
      <Products />
      <Testimonials />
    </div>
  );
}
