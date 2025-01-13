import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ToastAndroid, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db2 } from '../../configs/FirebaseConfig'; // Import db2 specifically
import { useUser } from '@clerk/clerk-expo';

export default function UserAddressList() {
    const { user } = useUser();
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchUserAddress();
        }
    }, [user]);

    const fetchUserAddress = async () => {
        setLoading(true);
        try {
            const userEmail = user?.primaryEmailAddress?.emailAddress; // Get user email from Clerk
            if (!userEmail) {
                ToastAndroid.show('User email is not available.', ToastAndroid.LONG);
                setLoading(false);
                return;
            }

            const addressDocRef = doc(db2, 'UserAddress', userEmail);
            const addressDoc = await getDoc(addressDocRef);

            if (addressDoc.exists()) {
                const userAddress = addressDoc.data();
                if (userAddress) {
                    setAddress(userAddress); // Set the address directly from the document
                } else {
                    ToastAndroid.show('No address found for this user.', ToastAndroid.LONG);
                }
            } else {
                ToastAndroid.show('No address document found for this user.', ToastAndroid.LONG);
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            ToastAndroid.show('Failed to fetch address.', ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Address</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : address ? (
                <View style={styles.addressCard}>
                    <Text style={styles.addressText}>Address Line 1: {address.addressLine1}</Text>
                    {address.addressLine2 ? (
                        <Text style={styles.addressText}>Address Line 2: {address.addressLine2}</Text>
                    ) : null}
                    <Text style={styles.addressText}>City: {address.city}</Text>
                    <Text style={styles.addressText}>State: {address.state}</Text>
                    <Text style={styles.addressText}>Postal Code: {address.postalCode}</Text>
                    <Text style={styles.addressText}>Country: {address.country}</Text>
                </View>
            ) : (
                <Text style={styles.noAddressText}>No address found.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    addressCard: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    addressText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    noAddressText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
    },
});
