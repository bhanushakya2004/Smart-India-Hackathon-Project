import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderItem({ order }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cropName}>{order.cropName}</Text>
      <Text>Quantity: {order.quantity}</Text>
      <Text>Price: ₹{order.totalPrice}</Text>
      <Text>Address: {order.address}</Text>
      <Text>Status: {order.status}</Text>
      <Text style={styles.timestamp}>{new Date(order.timestamp).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timestamp: {
    marginTop: 10,
    fontSize: 12,
    color: '#888',
  },
});
