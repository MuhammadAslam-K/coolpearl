/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { addBanner, getBannerById, updateBanner } from "../../../apis/firebase/banner";
import { toast } from "react-toastify";
import { addServices, getServicesById, updateServices } from "../../../apis/firebase/services";
import { addRecentWork, getRecentWorkById, updateRecentWork } from "../../../apis/firebase/recentWorks";

function Index({ title, onClose, isAdd, selectedData }) {
    console.log('selectedData', selectedData)
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [imageChanged, setImageChanged] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: '',
        status: '',
        imageFile: null,
    });

    // Function to handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({ ...data, imageFile: file });
            setSelectedImageUrl(URL.createObjectURL(file));
            setImageChanged(true)
        } else {
            setSelectedImageUrl(null);
        }
    };

    const handleSubmit = async () => {
        try {
            toast.loading('Please wait...')
            let res;
            if (title === 'Add Banner') {
                res = await addBanner(data)
            } else if (title === 'Add Services') {
                res = await addServices(data)
            } else if (title === 'Add Recent Work') {
                res = await addRecentWork(data)
            }
            if (res) {
                toast.dismiss()
                toast.success(`${isAdd ? 'Created' : 'Updated'} successfully`)
                onClose()
            }
        } catch (error) {
            toast.dismiss(), toast.error(error.message)
        }
    }

    const handleFetchData = async () => {
        try {
            let res;
            if (title === 'Update Banner') {
                res = await getBannerById(selectedData)
            } else if (title === 'Update Services') {
                res = await getServicesById(selectedData)
            } else if (title === 'Update Recent Work') {
                res = await getRecentWorkById(selectedData)
            }
            setData({ ...res, imageFile: null })
            setSelectedImageUrl(res?.imageUrl)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleUpdate = async () => {
        try {
            toast.loading('Please wait...')
            const updateData = { ...data, imageUrl: selectedImageUrl }
            let res;
            if (title === 'Update Banner') {
                res = await updateBanner(selectedData, updateData, imageChanged)
            } else if (title === 'Update Services') {
                res = await updateServices(selectedData, updateData, imageChanged)
            } else if (title === 'Update Recent Work') {
                res = await updateRecentWork(selectedData, updateData, imageChanged)
            }

            toast.dismiss()
            if (res) {
                toast.success('Updated successfully')
                onClose()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (selectedData) {
            handleFetchData()
        }
    }, [selectedData])


    return (
        <div className="w-full min-h-screen p-8 bg-gray-100">
            <div className="p-8 mx-auto bg-white rounded-lg shadow-lg w-fit">

                {/* Form Section */}
                <div className="space-y-4">
                    {/* data Form Section */}
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        {/* Title Input */}
                        <div>
                            <label className="block mb-1 text-lg font-medium">Title</label>
                            <input
                                required
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                className="w-full px-3 py-2 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter Title"
                            />
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label htmlFor="description" className="block mb-1 text-lg font-medium">Description</label>
                            <textarea
                                required
                                id="description"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                className="w-full h-32 p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter your description here..."
                            />
                        </div>

                        {/* Status Dropdown */}
                        <div>
                            <label htmlFor="status" className="block mb-1 text-lg font-medium">Status</label>
                            <select
                                required
                                id="status"
                                value={data.status}
                                onChange={(e) => setData({ ...data, status: e.target.value })}
                                className="w-full px-3 py-2 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload Section (Now Moved to Bottom) */}
                    <div className="mt-8">
                        <label className="block mb-2 text-lg font-medium">Upload Image</label>
                        <input
                            required
                            type="file"
                            accept="image/*"
                            className="block w-full mb-4 text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer"
                            onChange={handleImageChange}
                        />

                        {/* Image Preview or Placeholder */}
                        <div className={`flex items-center justify-center border-2 border-gray-300 rounded-lg bg-gray-50  ${title === 'Add Banner' ? 'w-[626px] h-[313px]' : 'w-[540px] h-[360px]'}`}>
                            {selectedImageUrl ? (
                                <img src={selectedImageUrl} alt="Preview" className="object-contain" />
                            ) : (
                                <span className="text-gray-500">Image preview {title === 'Add Banner' ? '(626x313)' : '(540x360)'}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit and Close Buttons */}
                <div className="flex gap-4 mt-6">
                    <button onClick={onClose} type="button"
                        className="w-1/2 py-3 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Close
                    </button>
                    <button
                        onClick={isAdd ? handleSubmit : handleUpdate}
                        type="button"
                        className="w-1/2 py-3 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                        {isAdd ? 'Create' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Index);
