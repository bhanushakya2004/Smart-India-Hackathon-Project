import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db2 } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo'; // For user authentication
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Orders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let userEmail = user?.primaryEmailAddress?.emailAddress;

        // Fallback: Retrieve email from AsyncStorage if not available
        if (!userEmail) {
          userEmail = await AsyncStorage.getItem('currentUserEmail');
          if (!userEmail) {
            Alert.alert('Error', 'User email not available.');
            return;
          }
        }

        const orderDocRef = doc(db2, 'orders', userEmail); // Reference to the user's orders
        const orderDoc = await getDoc(orderDocRef);

        if (orderDoc.exists()) {
          setOrders(orderDoc.data().orders || []); // Retrieve the orders array
        } else {
          console.log('No orders found for this user.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        Alert.alert('Error', 'Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFC107" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noOrders}>No orders found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function OrderCard({ order }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cropName}>{order.cropName}</Text>
      <View style={styles.row}>
        <Text style={styles.detailLabel}>Order ID:</Text>
        <Text style={styles.detailValue}>{order.orderId}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailLabel}>Farmer ID:</Text>
        <Text style={styles.detailValue}>{order.farmerId}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailLabel}>Quantity:</Text>
        <Text style={styles.detailValue}>{order.quantity}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailLabel}>Price per Unit:</Text>
        <Text style={styles.detailValue}>₹{order.pricePerUnit}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailLabel}>Total Price:</Text>
        <Text style={styles.totalPrice}>₹{order.totalPrice}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailLabel}>Address:</Text>
        <Text style={styles.detailValue}>{order.address}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={[styles.status, styles[`status${order.status}`]]}>
          {order.status}
        </Text>
      </View>
      <Text style={styles.timestamp}>
        Ordered on: {new Date(order.timestamp).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#FDF5E6',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D4AF37', // Golden title
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37', // Golden color for total price
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusPending: {
    color: '#FFC107', // Amber for pending status
  },
  statusCompleted: {
    color: '#28A745', // Green for completed status
  },
  statusCancelled: {
    color: '#DC3545', // Red for cancelled status
  },
  timestamp: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  noOrders: {
    fontSize: 18,
    color: '#D4AF37', // Golden color for "no orders" message
  },
});
