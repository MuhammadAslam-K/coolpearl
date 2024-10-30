/* eslint-disable react/prop-types */


function Index({ image, title, description, isVisible }) {
    return (
        <div
            className={`w-full md:w-[31%]  overflow-hidden shadow-xl bg-white transition-transform duration-500 ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                }`}
        >
            <img className="object-cover w-full h-48" src={image} alt={title} />
            <div className="px-6 py-4">
                <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-base text-gray-700">{description}</p>
            </div>
        </div>
    )
}

export default Index;
