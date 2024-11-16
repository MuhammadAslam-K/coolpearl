import { motion } from "framer-motion";

/* eslint-disable react/prop-types */
const ServiceCard = ({ image, title, description, isVisible, delay }) => {
    return (
        <motion.div
            className="relative w-full md:w-[49%] h-[350px] bg-center bg-cover shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }} // Slightly smaller and transparent at start
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }} // Fades in and scales up
            transition={{ duration: 0.6, delay }}
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center p-4 sm:p-6 md:p-8">
                <div className="relative z-10 text-white w-[80%]">
                    {/* Title */}
                    <div className="mb-1 text-xl font-semibold truncate sm:mb-2 sm:text-2xl">
                        {title}
                    </div>

                    {/* Decorative Accent */}
                    <div className="w-12 h-1 mb-3 bg-yellow-400"></div>

                    {/* Subtext with Animation and Line Clamp for mobile */}
                    <div className="relative group">
                        <div className="overflow-hidden text-sm sm:text-base line-clamp-3">
                            {description}
                        </div>
                        {/* Tooltip for full description on hover */}
                        <div className="absolute left-0 z-20 w-full p-2 transition-opacity duration-200 rounded opacity-0 -bottom-2 bg-black/90 group-hover:opacity-100">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
