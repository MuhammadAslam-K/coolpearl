import { uploadImage } from "./common";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, where, query, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { deleteObject, getStorage, ref } from "firebase/storage";


export const addBanner = async (data) => {
    try {
        let imageUrl = null;
        if (data.imageFile) {
            imageUrl = await uploadImage(data.imageFile, 'banners');
        }

        const docRef = await addDoc(collection(db, 'banners'), {
            name: data?.name,
            description: data?.description,
            status: data?.status,
            imageUrl: imageUrl
        });

        return docRef?.id;
    } catch (error) {
        console.log('Error adding document: ', error);
        return error;
    }
};

export const getAllBanners = async () => {
    try {
        const bannersSnapshot = await getDocs(collection(db, 'banners'));
        const bannersList = bannersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return bannersList;
    } catch (error) {
        console.log('Error getting banners: ', error);
        return error;
    }
};

export const getBannerById = async (bannerId) => {
    try {
        const bannerDoc = await getDoc(doc(db, 'banners', bannerId));

        if (!bannerDoc.exists()) {
            throw new Error('Banner not found');
        }

        return {
            id: bannerDoc.id,
            ...bannerDoc.data()
        };
    } catch (error) {
        console.log('Error getting banner: ', error);
        return error;
    }
};


export const updateBanner = async (bannerId, data, imageChanged) => {
    try {
        let imageUrl = data.imageUrl;
        const bannerRef = doc(db, 'banners', bannerId);

        if (imageChanged) {
            // Fetch the banner data to get the image URL
            const bannerDoc = await getDoc(bannerRef);
            if (!bannerDoc.exists()) {
                throw new Error('Banner not found');
            }
            const bannerData = bannerDoc.data();
            // Upload new image
            if (data.imageFile) {
                imageUrl = await uploadImage(data.imageFile, 'banners');
            }
            // If an image exists, delete it from storage
            if (bannerData.imageUrl) {
                const imageRef = ref(getStorage(), bannerData.imageUrl);
                await deleteObject(imageRef);
            }
        }

        await updateDoc(bannerRef, {
            name: data.name,
            description: data.description,
            status: data.status,
            imageUrl: imageUrl
        });

        return bannerId;
    } catch (error) {
        console.log('Error updating banner: ', error);
        throw error;
    }
};

export const deleteBanner = async (bannerId) => {
    try {
        // Create a reference to the banner document using its ID
        const bannerRef = doc(db, 'banners', bannerId);
        const bannerDoc = await getDoc(bannerRef);
        const bannerData = bannerDoc.data();

        // If an image exists, delete it from storage
        if (bannerData.imageUrl) {
            const imageRef = ref(getStorage(), bannerData.imageUrl);
            await deleteObject(imageRef);
        }
        // Delete the document
        await deleteDoc(bannerRef);
        return bannerRef
    } catch (error) {
        return error;
    }
};


// USERS SIDE
export const getActiveBanners = async () => {
    try {
        const bannersRef = collection(db, 'banners');
        const activeBannersQuery = query(bannersRef, where("status", "==", "active"));
        const querySnapshot = await getDocs(activeBannersQuery);

        // Extract the banners data
        const activeBanners = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return activeBanners;
    } catch (error) {
        console.error('Error fetching active banners: ', error);
        return error;
    }
};