import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDoc, doc, arrayUnion } from 'firebase/firestore';
import { db2 } from '../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function BuyCrop() {
  const { user } = useUser();
  const [cropDetails, setCropDetails] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch crop details from AsyncStorage
  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const cropId = await AsyncStorage.getItem('cropId');
        const cropName = await AsyncStorage.getItem('cropName');
        const farmerId = await AsyncStorage.getItem('farmerId');
        const pricePerUnit = await AsyncStorage.getItem('pricePerUnit');

        if (cropId && cropName && farmerId && pricePerUnit) {
          setCropDetails({
            cropId,
            cropName,
            farmerId,
            pricePerUnit: parseFloat(pricePerUnit),
          });
        } else {
          Alert.alert('Error', 'Crop details not found.');
        }

        // Log the fetched data
        console.log('Fetched crop details:', { cropId, cropName, farmerId, pricePerUnit });
      } catch (error) {
        console.error('Error fetching crop details from AsyncStorage:', error.message);
        Alert.alert('Error', 'Failed to load crop details.');
      }
    };

    fetchCropDetails();
  }, []);

  const placeOrder = async () => {
    if (!quantity || !address) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    const totalPrice = parseInt(quantity) * cropDetails.pricePerUnit;

    try {
      setLoading(true);
      const userEmail = user?.primaryEmailAddress?.emailAddress;

      if (!userEmail) {
        Alert.alert('Error', 'User email not available.');
        return;
      }

      const orderData = {
        orderId: `order_${new Date().getTime()}`,
        farmerId: cropDetails.farmerId,
        cropId: cropDetails.cropId,
        cropName: cropDetails.cropName,
        quantity: parseInt(quantity),
        pricePerUnit: cropDetails.pricePerUnit,
        totalPrice,
        // imageurl:image,
        address,
        timestamp: new Date().toISOString(),
        status: 'Pending',
      };

      const orderDocRef = doc(db2, 'orders', userEmail);
      await setDoc(
        orderDocRef,
        { orders: arrayUnion(orderData) },
        { merge: true }
      );

      Alert.alert('Success', 'Order placed successfully!');
      setQuantity('');
      setAddress('');
    } catch (error) {
      console.error('Error placing order:', error.message);
      Alert.alert('Error', 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (!cropDetails) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://www.example.com/crop-image.jpg' }} // Replace with actual crop image
            style={styles.image}
          />
          <Text style={styles.title}>Buy {cropDetails.cropName}</Text>
          <Text style={styles.price}>₹{cropDetails.pricePerUnit} per unit</Text>

          <TextInput
            placeholder="Enter Quantity"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Delivery Address"
            value={address}
            onChangeText={setAddress}
            style={[styles.input, styles.addressInput]}
            multiline
          />

          <TouchableOpacity
            style={[styles.button, loading && { backgroundColor: '#A9A9A9' }]}
            onPress={placeOrder}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FF8C00',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
    color: '#333',
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top', // For multiline inputs
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
