import Banner from "@/components/Banner/Banner";
import Products from "@/components/Products/Products";
import SliderSection from "@/components/SliderSection/SliderSection";
import Subscribe from "@/components/Subscribe/Subscribe";
import Testimonials from "@/components/Testimonials/Testimonials";
import TopProducts from "@/components/TopProducts/TopProducts";

export default function Home() {
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
