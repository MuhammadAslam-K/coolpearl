import { motion } from "framer-motion";
import ServiceCard from "./serviceCard";
import { useEffect, useState } from "react";
import { getActiveServices } from "../../apis/firebase/services";


function Index() {
    const [services, setServices] = useState([]);

    const handleFetchServices = async () => {
        const services = await getActiveServices();
        console.log('services', services)
        setServices(services);
    }

    useEffect(() => {
        handleFetchServices()
    }, [])


    return (
        <div>
            <div>
                {/* Animating the "Services" heading */}
                <motion.h2
                    className="mt-20 text-5xl font-bold text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8 }}
                >
                    Services
                </motion.h2>

                {/* Animating the "Explore Our Services" subheading */}
                <motion.h2
                    className="mt-2 text-2xl text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Explore Our Services
                </motion.h2>
            </div>


            <div className="flex flex-wrap h-full gap-3 p-5 mt-10 justify-evenly">
                {services?.map((service, index) => (

                    <ServiceCard
                        key={index}
                        image={service?.imageUrl}
                        title={service?.name}
                        description={service?.description}
                    />

                ))}
            </div>

        </div>
    )
}

export default Index