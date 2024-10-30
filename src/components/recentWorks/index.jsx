import { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import RecentWorksCard from './card';
import { getActiveServices } from '../../apis/firebase/services';
// import { getActiveRecentWorks } from '../../apis/firebase/recentWorks';

function Index() {
    const [services, setServices] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const handleFetchServices = async () => {
        const services = await getActiveServices();
        setServices(services);
    };

    useEffect(() => {
        handleFetchServices();

        // Intersection Observer to detect visibility of the section
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true); // Trigger animation when section is visible
                    observer.disconnect(); // Stop observing once visible
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div>

            <motion.h2
                className="mt-20 text-5xl font-bold text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
            >
                Recent Works
            </motion.h2>

            {/* Animating the new subheading for Recent Works */}
            <motion.h2
                className="mt-2 mb-5 text-2xl text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                Discover the passion and precision behind our latest projects.
            </motion.h2>

            <div
                className="flex flex-wrap justify-center gap-4 mt-10"
                ref={sectionRef} // Attach observer to this section
            >
                {services?.map((works, index) => (
                    <RecentWorksCard
                        key={index}
                        image={works?.imageUrl}
                        title={works?.name}
                        description={works?.description}
                        isVisible={isVisible} // Pass visibility state to each card
                    />
                ))}
            </div>
        </div>
    );
}

export default Index;
