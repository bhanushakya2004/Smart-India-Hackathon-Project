import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db2 } from '../../configs/FirebaseConfig';
import PopularBusinessCard from './PopularBusinessCard';
import { Ionicons } from '@expo/vector-icons';

export default function PopularBusiness() {
    const [businessList, setBusinessList] = useState([]);
    const [filteredBusinessList, setFilteredBusinessList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        GetBusinessList();
    }, []);

    const GetBusinessList = async () => {
        const q = query(collection(db2, 'crops'), limit(10));
        const querySnapshot = await getDocs(q);

        const businesses = [];
        querySnapshot.forEach((doc) => {
            businesses.push({ id: doc.id, ...doc.data() });
        });

        setBusinessList(businesses);
        setFilteredBusinessList(businesses); // Initialize with all businesses
    };

    const handleSearch = (query) => {
        setSearchQuery(query); // Update searchQuery state
        if (query === '') {
            setFilteredBusinessList(businessList);
        } else {
            setFilteredBusinessList(
                businessList.filter((business) =>
                    business.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={{ flex: 1, padding: 20 }}>
                {/* Search Bar */}
                <Text
        style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
            marginBottom: 10
            // marginTop: 20
        }}
    >
        Search your Fresh Grains here
    </Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 8,
                }}>
                    <Ionicons name="search" size={24} color={Colors.PRIMARY} />
                    <TextInput
                        placeholder='Search...'
                        value={searchQuery}
                        onChangeText={handleSearch}
                        style={{
                            fontFamily: 'outfit',
                            fontSize: 16,
                            flex: 1, // Ensure input takes full width
                        }}
                    />
                    {searchQuery ? (
                        <Ionicons
                            name="close-circle"
                            size={24}
                            color={Colors.GRAY}
                            onPress={() => setSearchQuery('')}
                        />
                    ) : null}
                </View>

                

                <FlatList
                    data={filteredBusinessList}
                    numColumns={2} // Display two cards in each row
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PopularBusinessCard business={item} />
                    )}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }} // Spacing between rows
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </KeyboardAvoidingView>
    );
}
