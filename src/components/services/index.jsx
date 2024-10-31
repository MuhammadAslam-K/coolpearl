import { motion } from "framer-motion";
import ServiceCard from "./serviceCard";
import { useEffect, useRef, useState } from "react";
import { getActiveServices } from "../../apis/firebase/services";


function Index() {
    const [services, setServices] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const handleFetchServices = async () => {
        const services = await getActiveServices();
        setServices(services);
    }

    useEffect(() => {
        handleFetchServices()

        // Intersection Observer to detect visibility of the section
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    // Wait for 1 second before triggering the animation
                    setTimeout(() => {
                        setIsVisible(true); // Trigger animation when section is visible
                    }, 100);
                } else {
                    setIsVisible(false); // Reset animation when not visible
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
    }, [])


    return (
        <div>
            <div>
                {/* Animating the "Services" heading */}
                <motion.h2
                    className="mt-20 text-3xl md:text-4xl lg:text-5xl font-bold text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8 }}
                >
                    Services
                </motion.h2>

                {/* Animating the "Explore Our Services" subheading */}
                <motion.h2
                    className="mt-2 text-xl md:text-2xl text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Explore Our Services
                </motion.h2>
            </div>


            <div className="flex flex-wrap h-full gap-3 p-5 mt-10 justify-evenly"
                ref={sectionRef}>
                {services?.map((service, index) => (

                    <ServiceCard
                        key={index}
                        image={service?.imageUrl}
                        title={service?.name}
                        description={service?.description}
                        isVisible={isVisible}
                        delay={index * 0.2}
                    />

                ))}
            </div>

        </div>
    )
}

export default Index