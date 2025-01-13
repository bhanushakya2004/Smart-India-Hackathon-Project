import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { db2 } from '../../configs/FirebaseConfig'; // Firebase configuration file
import { doc, setDoc } from 'firebase/firestore';
import { Colors } from './../../constants/Colors';

export default function Header() {
    const { user } = useUser();

    // Save user data to Firestore on user login
    useEffect(() => {
        if (user) {
            const storeUserData = async () => {
                try {
                    // Prepare user data to store in Firebase
                    const userData = {
                        fullName: user.fullName,
                        email: user.primaryEmailAddress?.emailAddress,
                        imageUrl: user.imageUrl,
                        createdAt: new Date(), // Store timestamp when the user is added
                    };

                    // Ensure you're using Firebase auth `uid` for the document ID
                    const userDocRef = doc(db2, 'users', user.id); // Use Clerk user ID as document ID
                    
                    // Create or update user document in Firestore
                    await setDoc(userDocRef, userData, { merge: true });

                    console.log('User data successfully stored in Firestore!');
                } catch (error) {
                    console.error('Error storing user data:', error);
                }
            };

            storeUserData();
        }
    }, [user]);

    return (
        <View style={{
            padding: 20,
            paddingTop: 40,
            backgroundColor: Colors.PRIMARY,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}>
                <Image
                    source={{ uri: user?.imageUrl }}
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 99,
                    }}
                />
                <View>
                    <Text style={{ color: '#fff' }}>Welcome,</Text>
                    <Text style={{
                        fontSize: 19,
                        color: '#fff',
                        fontFamily: 'outfit-medium',
                    }}>
                        {user?.fullName}
                    </Text>
                </View>
            </View>
        </View>
    );
}
