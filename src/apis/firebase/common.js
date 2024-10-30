import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const uploadImage = async (imageFile, location) => {
    try {
        console.log('Uploading image...');
        const storage = getStorage();
        const storageRef = ref(storage, `images/${location}/${imageFile.name}`);

        // Upload the image
        await uploadBytes(storageRef, imageFile);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.log('Error uploading image: ', error);
        return error;
    }
};
