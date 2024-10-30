import { uploadImage } from "./common";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, where, query, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { deleteObject, getStorage, ref } from "firebase/storage";


export const addRecentWork = async (data) => {
    try {
        let imageUrl = null;
        if (data.imageFile) {
            imageUrl = await uploadImage(data.imageFile, 'recentWorks');
        }

        const docRef = await addDoc(collection(db, 'recentWorks'), {
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

export const getAllRecentWorks = async () => {
    try {
        const recentWorksSnapshot = await getDocs(collection(db, 'recentWorks'));
        const recentWorksList = recentWorksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return recentWorksList;
    } catch (error) {
        console.log('Error getting recent works: ', error);
        return error;
    }
};

export const getRecentWorkById = async (recentWorkId) => {
    try {
        const recentWorkDoc = await getDoc(doc(db, 'recentWorks', recentWorkId));

        if (!recentWorkDoc.exists()) {
            throw new Error('Recent work not found');
        }

        return {
            id: recentWorkDoc.id,
            ...recentWorkDoc.data()
        };
    } catch (error) {
        console.log('Error getting recent work: ', error);
        return error;
    }
};


export const updateRecentWork = async (recentWorkId, data, imageChanged) => {
    try {
        let imageUrl = data.imageUrl;
        const recentWorkRef = doc(db, 'recentWorks', recentWorkId);

        if (imageChanged) {
            // Fetch the banner data to get the image URL
            const recentWorkDoc = await getDoc(recentWorkRef);
            if (!recentWorkDoc.exists()) {
                throw new Error('Recent work not found');
            }
            const recentWorkData = recentWorkDoc.data();
            // Upload new image
            if (data.imageFile) {
                imageUrl = await uploadImage(data.imageFile, 'recentWorks');
            }
            // If an image exists, delete it from storage
            if (recentWorkData.imageUrl) {
                const imageRef = ref(getStorage(), recentWorkData.imageUrl);
                await deleteObject(imageRef);
            }
        }

        await updateDoc(recentWorkRef, {
            name: data.name,
            description: data.description,
            status: data.status,
            imageUrl: imageUrl
        });

        return recentWorkId;
    } catch (error) {
        console.log('Error updating recent work: ', error);
        throw error;
    }
};

export const deleteRecentWork = async (recentWorkId) => {
    try {
        // Create a reference to the banner document using its ID
        const recentWorkRef = doc(db, 'recentWorks', recentWorkId);
        const recentWorkDoc = await getDoc(recentWorkRef);
        const recentWorkData = recentWorkDoc.data();

        // If an image exists, delete it from storage
        if (recentWorkData.imageUrl) {
            const imageRef = ref(getStorage(), recentWorkData.imageUrl);
            await deleteObject(imageRef);
        }
        // Delete the document
        await deleteDoc(recentWorkRef);
        return recentWorkId
    } catch (error) {
        return error;
    }
};


// USERS SIDE
export const getActiveRecentWorks = async () => {
    try {
        const recentWorksRef = collection(db, 'recentWorks');
        const activeRecentWorksQuery = query(recentWorksRef, where("status", "==", "active"));
        const querySnapshot = await getDocs(activeRecentWorksQuery);

        // Extract the banners data
        const activeRecentWorks = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return activeRecentWorks;
    } catch (error) {
        console.error('Error fetching active recent works: ', error);
        return error;
    }
};