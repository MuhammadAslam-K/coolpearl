/* eslint-disable react/prop-types */

import { motion } from 'framer-motion';

function Index({ image, title, description, isVisible, delay }) {
    return (
        <motion.div
            className={`w-full md:w-[31%] overflow-hidden shadow-xl bg-white transition-transform duration-500 ease-out`}
            initial={{ x: 100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.6, delay }}  // Add staggered delay here
        >
            <img className="object-cover w-full h-60" src={image} alt={title} />
            <div className="px-6 py-4">
                <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-base text-gray-700">{description}</p>
            </div>
        </motion.div>
    );
}

export default Index;
