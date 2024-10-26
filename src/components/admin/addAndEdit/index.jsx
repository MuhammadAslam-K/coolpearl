import React, { useState } from "react";

function Index() {
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <div className="w-full min-h-screen p-8 bg-gray-100">
            <div className="p-8 mx-auto bg-white rounded-lg shadow-lg w-fit">

                {/* Form Section */}
                <div className="space-y-4">
                    {/* Category Form Section */}
                    <div className="space-y-4">
                        {/* Title Input */}
                        <div>
                            <label className="block mb-1 text-lg font-medium">Title</label>
                            <input
                                className="w-full px-3 py-2 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter Title"
                            />
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label htmlFor="description" className="block mb-1 text-lg font-medium">Description</label>
                            <textarea
                                id="description"
                                className="w-full h-32 p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter your description here..."
                            />
                        </div>

                        {/* Status Dropdown */}
                        <div>
                            <label htmlFor="status" className="block mb-1 text-lg font-medium">Status</label>
                            <select
                                id="status"
                                className="w-full px-3 py-2 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload Section (Now Moved to Bottom) */}
                    <div className="mt-8">
                        <label className="block mb-2 text-lg font-medium">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full mb-4 text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer"
                            onChange={handleImageChange}
                        />

                        {/* Image Preview or Placeholder */}
                        <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg bg-gray-50 w-[626px] h-[313px]">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Preview" className="object-contain" />
                            ) : (
                                <span className="text-gray-500">Image preview (626x313)</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit and Close Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        type="button"
                        className="w-1/2 py-3 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="w-1/2 py-3 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Index);
