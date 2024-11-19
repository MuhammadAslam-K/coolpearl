import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getActiveBanners } from "../../apis/firebase/banner";


const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(false);


    const handleFetchBanners = async () => {
        const banners = await getActiveBanners();
        console.log('banners', banners)
        setBanners(banners);
    }


    useEffect(() => {
        handleFetchBanners()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
            setShowText(false); // Hide text when changing the image
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [banners.length]);

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
                <motion.div key={currentIndex}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ x: "100%", opacity: 0 }} // Start from the right side and transparent
                    animate={{ x: 0, opacity: 20 }} // Slide in from the right and become visible
                    exit={{ x: "-100%", opacity: 0 }} // Slide out to the left and become transparent
                    transition={{ duration: 0.6 }} // 1 second transition duration
                >
                    <img
                        src={banners[currentIndex]?.imageUrl}
                        alt="Banner"
                        className="absolute inset-0 object-cover w-full h-full"
                    />

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
                                {banners[currentIndex]?.name}
                            </motion.h1>

                            {/* Description Animation */}
                            <motion.p
                                className="mb-8 text-lg md:text-xl"
                                initial={{ y: -50, opacity: 0 }} // Start above and transparent
                                animate={{ y: 0, opacity: 1 }} // Move to position and fade in
                                transition={{ duration: 0.8, delay: 0.2 }} // Transition duration for description
                            >
                                {banners[currentIndex]?.description}
                            </motion.p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute hidden transform -translate-y-1/2 left-4 top-1/2 md:block">
                <button
                    onClick={() =>
                        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners?.length - 1 : prevIndex - 1))
                    }
                    className="text-2xl text-white"
                >
                    {"← PREV"}
                </button>
            </div>
            <div className="absolute hidden transform -translate-y-1/2 right-4 top-1/2 md:block">
                <button
                    onClick={() =>
                        setCurrentIndex((prevIndex) => (prevIndex === banners?.length - 1 ? 0 : prevIndex + 1))
                    }
                    className="text-2xl text-white"
                >
                    {"NEXT →"}
                </button>
            </div>
        </div>
    );
};

export default Banner;