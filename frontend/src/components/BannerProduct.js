import React, { useState, useEffect } from "react";
import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const BannerProduct = () => {
  const [CurrentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  // Function to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(desktopImages.length - 1 > CurrentImage){
        nextImage()
      }else{
        setCurrentImage(0)
      }
    },5000)

    return ()=> clearInterval(interval)
  },[CurrentImage])

  const nextImage = () => {
    const images = isMobile ? mobileImages : desktopImages;
    if (CurrentImage < images.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const previousImage = () => {
    if (CurrentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  const imagesToDisplay = isMobile ? mobileImages : desktopImages;

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-60 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full flex items-center justify-between text-2xl">
          <button
            className="bg-white shadow-md rounded-full p-1"
            onClick={previousImage}
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-white shadow-md rounded-full p-1"
            onClick={nextImage}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="h-full w-full overflow-hidden">
          {/* Image slider wrapper */}
          <div
            className="flex h-full transition-transform duration-300"
            style={{ transform: `translateX(-${CurrentImage * 100}%)` }}
          >
            {imagesToDisplay.map((imageurl, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={imageurl}
                  className="w-full h-full object-cover"
                  alt={`banner-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
