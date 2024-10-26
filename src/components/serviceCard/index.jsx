import image from '../../assets/washingMachin.png';

const RepairCard = () => {
    return (
        // ... existing code ...

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
                <div className="relative z-10 p-8 text-white w-[60%]">
                    {/* Title */}
                    <h2 className="mb-2 text-2xl font-semibold">Washing Machine Repair</h2>

                    {/* Decorative Accent */}
                    <div className="w-12 h-1 mb-4 bg-yellow-400"></div>

                    {/* Subtext */}
                    <p className="text-sm">
                        Whether your washing machine is front loading or top loading, our experts can provide fast and efficient repair to get it working again.
                    </p>
                </div>
            </div>
        </div>

        // ... rest of the component
    );
};

export default RepairCard;