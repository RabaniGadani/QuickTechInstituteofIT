import Image from 'next/image';
import { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5"> {/* Background removed */}
      <div className="max-w-xl mx-auto p-5 flex flex-col items-center">
        {/* Director Picture */}
        <div className="relative w-48 h-48 rounded-lg overflow-hidden mb-5">
          <Image
            src="/Sanaullah.jpg"
            alt="Director Sanaullah Shaikh"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Director Info */}
        <div className="text-center text-black">
          <h2 className="text-2xl font-bold mb-2">Director, Sanaullah Shaikh</h2>
          <p className="text-lg">
          Welcome to Quick Tech Institute of Information Technology
          At Quick Tech Institute, we are committed to shaping the future by providing cutting-edge education in the field of Information Technology. Our state-of-the-art facilities, experienced faculty, and modern teaching methodologies empower students to thrive in the ever-evolving tech industry. Led by our visionary Director, Sanaullah Shaikh, we foster a culture of innovation, learning, and leadership. Join us to explore new opportunities and unlock your full potential in the world of technology!
          </p>
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="flex w-[300%] h-full transition-transform duration-500"
          style={{ transform: `translateX(-${slideIndex * 33.3333}%)` }}
        >
          {/* Slide 1 */}
          <div className="w-1/3 h-full relative">
            <div className="relative w-full h-full">
              <Image
                src="/Logo-.png"
                alt="Slide 1"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white text-2xl font-bold">Welcome to Our Institute</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="w-1/3 h-full relative">
            <div className="relative w-full h-full">
              <Image
                src="/Sanaullah.jpg"
                alt="Slide 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white text-2xl font-bold">Director Sanaullah Shaikh</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="w-1/3 h-full relative">
            <div className="relative w-full h-full">
              <Image
                src="/Advertise.jpg"
                alt="Slide 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white text-2xl font-bold">Join Us Today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
