import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator, 
    ToastAndroid, 
    StyleSheet, 
    KeyboardAvoidingView, 
    ScrollView, 
    Platform 
} from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { db2 } from '../../configs/FirebaseConfig'; // Import db2 specifically
import { useUser } from '@clerk/clerk-expo'; // Importing Clerk's user context

export default function AddUserAddress() {
    const { user } = useUser(); // Accessing the user's data from Clerk
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false); // For loading state when saving address

    // Function to save address in Firestore
    const saveAddress = async () => {
        if (!addressLine1 || !city || !state || !postalCode || !country) {
            ToastAndroid.show('Please fill all required fields!', ToastAndroid.LONG); // Show error if any field is empty
            return;
        }

        setLoading(true); // Start loading

        try {
            const userEmail = user?.primaryEmailAddress?.emailAddress; // Get user's email from Clerk
            if (!userEmail) {
                ToastAndroid.show('User email is not available.', ToastAndroid.LONG);
                setLoading(false);
                return;
            }

            const addressDocRef = doc(db2, 'UserAddress', userEmail); // Use email as document ID
            await setDoc(addressDocRef, {
                addressLine1,
                addressLine2,
                city,
                state,
                postalCode,
                country,
                email: userEmail,
            });

            ToastAndroid.show('Address saved successfully!', ToastAndroid.LONG); // Success message
        } catch (error) {
            console.error('Error saving address:', error);
            ToastAndroid.show('Failed to save address. Try again.', ToastAndroid.LONG); // Error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#f5f5f5' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            
            <ScrollView contentContainerStyle={styles.container}>
                
                <Text style={styles.title}>Add User Address</Text>
                <TextInput
                    placeholder="Address Line 1"
                    value={addressLine1}
                    onChangeText={setAddressLine1}
                    style={styles.input}
                    placeholderTextColor="#555"
                />
                <TextInput
                    placeholder="Address Line 2"
                    value={addressLine2}
                    onChangeText={setAddressLine2}
                    style={styles.input}
                    placeholderTextColor="#555"
                />
                <TextInput
                    placeholder="City"
                    value={city}
                    onChangeText={setCity}
                    style={styles.input}
                    placeholderTextColor="#555"
                />
                <TextInput
                    placeholder="State"
                    value={state}
                    onChangeText={setState}
                    style={styles.input}
                    placeholderTextColor="#555"
                />
                <TextInput
                    placeholder="Postal Code"
                    value={postalCode}
                    onChangeText={setPostalCode}
                    style={styles.input}
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Country"
                    value={country}
                    onChangeText={setCountry}
                    style={styles.input}
                    placeholderTextColor="#555"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={saveAddress}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Save Address</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        width: '90%',
        padding: 15,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
