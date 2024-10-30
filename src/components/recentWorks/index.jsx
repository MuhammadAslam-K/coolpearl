import { useEffect, useState, useRef } from 'react';
import RecentWorksCard from './card';
import { getActiveServices } from '../../apis/firebase/services';

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
        <div
            className="flex flex-wrap justify-center gap-4"
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
    );
}

export default Index;
