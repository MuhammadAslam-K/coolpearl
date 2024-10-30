import { uploadImage } from "./common";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, where, query, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { deleteObject, getStorage, ref } from "firebase/storage";

export const addServices = async (data) => {
    try {
        let imageUrl = null;
        if (data.imageFile) {
            imageUrl = await uploadImage(data.imageFile, 'services');
        }

        const docRef = await addDoc(collection(db, 'services'), {
            name: data.name,
            description: data.description,
            status: data.status,
            imageUrl: imageUrl
        });

        return docRef.id;
    } catch (error) {
        return error;
    }
};


export const getAllServices = async () => {
    try {
        const servicesSnapshot = await getDocs(collection(db, 'services'));
        const servicesList = servicesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return servicesList;
    } catch (error) {
        console.log('Error getting services: ', error);
        throw error;
    }
};

export const getServicesById = async (servicesId) => {
    try {
        const servicesDoc = await getDoc(doc(db, 'services', servicesId));

        if (!servicesDoc.exists()) {
            throw new Error('Service not found');
        }

        return {
            id: servicesDoc.id,
            ...servicesDoc.data()
        };
    } catch (error) {
        console.log('Error getting Service: ', error);
        return error;
    }
};


export const updateServices = async (serviceId, data, imageChanged) => {
    try {
        let imageUrl = data.imageUrl;
        const serviceRef = doc(db, 'services', serviceId);

        if (imageChanged) {
            // Fetch the banner data to get the image URL
            const serviceDoc = await getDoc(serviceRef);
            if (!serviceDoc.exists()) {
                throw new Error('Service not found');
            }
            const serviceData = serviceDoc.data();
            // Upload new image
            if (data.imageFile) {
                imageUrl = await uploadImage(data.imageFile, 'services');
            }
            // If an image exists, delete it from storage
            if (serviceData.imageUrl) {
                const imageRef = ref(getStorage(), serviceData.imageUrl);
                await deleteObject(imageRef);
            }
        }

        await updateDoc(serviceRef, {
            name: data.name,
            description: data.description,
            status: data.status,
            imageUrl: imageUrl
        });

        return serviceId;
    } catch (error) {
        console.log('Error updating Services: ', error);
        throw error;
    }
};

export const deleteServices = async (servicesId) => {
    try {
        // Create a reference to the banner document using its ID
        const servicesRef = doc(db, 'services', servicesId);
        const servicesDoc = await getDoc(servicesRef);
        const servicesData = servicesDoc.data();

        // If an image exists, delete it from storage
        if (servicesData.imageUrl) {
            const imageRef = ref(getStorage(), servicesData.imageUrl);
            await deleteObject(imageRef);
        }
        // Delete the document
        await deleteDoc(servicesRef);
        return servicesRef
    } catch (error) {
        return error;
    }
};


// USER SIDE
export const getActiveServices = async () => {
    try {
        const servicesRef = collection(db, 'services');
        const activeServicesQuery = query(servicesRef, where("status", "==", "active"));
        const querySnapshot = await getDocs(activeServicesQuery);

        // Extract the banners data
        const activeServices = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return activeServices;
    } catch (error) {
        console.error('Error fetching active services: ', error);
        return error;
    }
};