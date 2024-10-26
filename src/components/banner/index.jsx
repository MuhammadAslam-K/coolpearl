import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BannerImage from "../../assets/image.png";
import BannerImage1 from "../../assets/image1.png";
import BannerImage2 from "../../assets/image2.png";


const Banner = () => {
    const bannerImages = [
        {
            image: BannerImage,
            title: "Washing Machine Repair",
            description:
                "Whether your washing machine is front loading or top loading, our experts can provide fast and efficient repair to get it working again.",
        },
        {
            image: BannerImage1,
            title: "Refrigerator Repair",
            description:
                "Whether your refrigerator is front loading or top loading, our experts can provide fast and efficient repair to get it working again.",
        },
        {
            image: BannerImage2,
            title: "Air Conditioner Repair",
            description: "Whether your air conditioner is front loading or top loading, our experts can provide fast and efficient repair to get it working again.",
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(false); // State to control text visibility

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
            setShowText(false); // Hide text when changing the image
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [bannerImages.length]);

    useEffect(() => {
        // Delay showing text for a brief moment after the image has settled
        const timeout = setTimeout(() => {
            setShowText(true);
        }, 1000); // Show text after 1 second

        return () => clearTimeout(timeout);
    }, [currentIndex]);

    return (
        <div className="relative h-screen overflow-hidden">
            <AnimatePresence>
                <motion.div
                    key={currentIndex}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${bannerImages[currentIndex].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    initial={{ x: "100%", opacity: 0 }} // Start from the right side and transparent
                    animate={{ x: 0, opacity: 20 }} // Slide in from the right and become visible
                    exit={{ x: "-100%", opacity: 0 }} // Slide out to the left and become transparent
                    transition={{ duration: 0.6 }} // 1 second transition duration
                >
                    {/* Light blue overlay for fade effect */}
                    <div className="absolute inset-0 bg-[#383f4b] opacity-30"></div>

                    {/* Show text only when it's ready */}
                    {showText && (
                        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white w-[90%] md:w-[60%]">
                            {/* Title Animation */}
                            <motion.h1
                                className="mb-4 text-4xl font-bold md:text-6xl"
                                initial={{ y: -100, opacity: 0 }} // Start above and transparent
                                animate={{ y: 0, opacity: 1 }} // Move to position and fade in
                                transition={{ duration: 0.8 }} // Transition duration for title
                            >
                                {bannerImages[currentIndex].title}
                            </motion.h1>

                            {/* Description Animation */}
                            <motion.p
                                className="mb-8 text-lg md:text-xl"
                                initial={{ y: -50, opacity: 0 }} // Start above and transparent
                                animate={{ y: 0, opacity: 1 }} // Move to position and fade in
                                transition={{ duration: 0.8, delay: 0.2 }} // Transition duration for description
                            >
                                {bannerImages[currentIndex].description}
                            </motion.p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute hidden transform -translate-y-1/2 left-4 top-1/2 md:block">
                <button
                    onClick={() =>
                        setCurrentIndex((prevIndex) => (prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1))
                    }
                    className="text-2xl text-white"
                >
                    {"← PREV"}
                </button>
            </div>
            <div className="absolute hidden transform -translate-y-1/2 right-4 top-1/2 md:block">
                <button
                    onClick={() =>
                        setCurrentIndex((prevIndex) => (prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1))
                    }
                    className="text-2xl text-white"
                >
                    {"NEXT →"}
                </button>
            </div>

            {/* Scroll down indicator */}
            <div className="absolute text-center transform -translate-x-1/2 left-1/2 bottom-8 animate-bounce" >
                <p className="text-sm text-white">Scroll Down</p>
                <div className="text-2xl text-white cursor-pointer">↓</div>
            </div>
        </div>
    );
};

export default Banner;