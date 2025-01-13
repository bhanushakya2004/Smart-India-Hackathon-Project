import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function ActionButton({ business }) {
  const router = useRouter();

  // Save crop and farmer details in AsyncStorage and navigate to BuyCrop
  const handleBuyNow = async () => {
    try {
      const { cropId, name: cropName, farmerid: farmerId, price } = business;

      if (!cropId || !cropName || !farmerId || !price) {
        Alert.alert('Error', 'Missing crop or farmer details.');
        return;
      }

      // Save crop details to AsyncStorage
      console.log('Saving crop details to AsyncStorage...');
      await AsyncStorage.multiSet([
        ['cropId', cropId],
        ['cropName', cropName],
        ['farmerId', farmerId],
        ['pricePerUnit', price.toString()],
      ]);

      // Verify that the data is saved
      const savedCropId = await AsyncStorage.getItem('cropId');
      console.log('Saved cropId:', savedCropId); // Check if cropId is saved correctly

      router.push('/BuyCrop');
    } catch (error) {
      console.error('Error saving crop details to AsyncStorage:', error.message);
      Alert.alert('Error', 'Failed to navigate to BuyCrop.');
    }
  };

  // Save farmer ID in AsyncStorage and navigate to FarmerDetails
  const handleFarmerDetails = async () => {
    try {
      if (!business?.farmerid) {
        Alert.alert('Error', 'Farmer ID is missing.');
        return;
      }

      await AsyncStorage.setItem('currentFarmerId', business?.farmerid);
      router.push('/FarmerDetails');
    } catch (error) {
      console.error('Error saving farmer ID to AsyncStorage:', error.message);
      Alert.alert('Error', 'Failed to navigate to FarmerDetails.');
    }
  };

  // Open URLs like phone dialer or external links
  const openURL = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open URL:', err.message);
      Alert.alert('Error', 'Failed to open the link.');
    });
  };

  // Action buttons menu
  const actionButtonMenu = [
    // {
    //   id: 1,
    //   name: 'Contact',
    //   icon: require('../../assets/images/call.png'),
    //   action: () => openURL(`tel:${business?.phone}`), // Open phone dialer
    // },
    {
      id: 2,
      name: 'Buy Now',
      icon: require('../../assets/images/shopping-cart.png'),
      action: handleBuyNow, // Navigate to BuyCrop
    },
    {
      id: 3,
      name: 'Farmer',
      icon: require('../../assets/images/tea.png'),
      action: handleFarmerDetails, // Navigate to FarmerDetails
    },
  ];

  return (
    <View style={styles.container}>
      {actionButtonMenu.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.button}
          onPress={item.action}
        >
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: -20,
  },
  button: {
    alignItems: 'center',
    margin: 10,
    width: 80,
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
