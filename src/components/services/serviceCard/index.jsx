/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const ServiceCard = ({ image, title, description }) => {
    return (
        <div
            className="relative w-full md:w-[49%] h-[350px] overflow-hidden bg-center bg-cover shadow-lg"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
                <div className="relative z-10 p-8 text-white w-[90%]">
                    {/* Title with Animation */}
                    <motion.h2
                        className="mb-2 text-2xl font-semibold"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {title}
                    </motion.h2>

                    {/* Decorative Accent */}
                    <div className="w-12 h-1 mb-4 bg-yellow-400"></div>

                    {/* Subtext with Animation */}
                    <motion.p
                        className="text-base"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
