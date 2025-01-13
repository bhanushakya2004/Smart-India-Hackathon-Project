import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { db2 } from '../../configs/FirebaseConfig'; // Firebase configuration
import { useUser } from '@clerk/clerk-expo'; // Clerk user context
import moment from 'moment'; // For formatting timestamps

export default function Reviews({ business }) {
  const { user } = useUser(); // Access the logged-in user's data
  const [userInput, setUserInput] = useState(''); // User review input
  const [reviews, setReviews] = useState([]); // Reviews data
  const [loading, setLoading] = useState(false); // Loading state for review submission

  // Fetch reviews for the current crop
  const fetchReviews = async () => {
    try {
      const reviewsQuery = query(
        collection(db2, 'review'),
        where('cropId', '==', business?.id)
      );
      const querySnapshot = await getDocs(reviewsQuery);

      const fetchedReviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async () => {
    if (!userInput.trim()) {
      ToastAndroid.show('Please write your review!', ToastAndroid.LONG);
      return;
    }

    // Hide the keyboard when the button is pressed
    Keyboard.dismiss();

    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        throw new Error('User email is not available.');
      }

      if (!business?.id) {
        throw new Error('Invalid business data. Crop ID not found.');
      }

      // Create a document in the "review" collection using a composite key
      const reviewDocRef = doc(db2, 'review', `${business?.id}-${userEmail}-${Date.now()}`);
      await setDoc(reviewDocRef, {
        cropId: business?.id,
        farmerName: business?.farmername,
        comment: userInput.trim(),
        email: userEmail,
        cropName: business?.name,
        timestamp: new Date(),
      });

      // Refresh the reviews after submission
      fetchReviews();

      // Show an alert with the submitted review
      Alert.alert(
        'Review Submitted',
        `Thank you for your review:\n\n"${userInput.trim()}"`,
        [{ text: 'OK' }]
      );

      // Clear the review input
      setUserInput('');
    } catch (error) {
      console.error('Error adding review:', error.message);
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
    }
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewName}>{item.email}</Text>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewDate}>{moment(item.timestamp.toDate()).fromNow()}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Customer Reviews</Text>

        {/* Reviews List */}
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReview}
          contentContainerStyle={styles.reviewsList}
          ListEmptyComponent={
            <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
          }
        />

        <View style={styles.divider} />

        {/* Write a Review */}
        <Text style={styles.title}>Write a Review</Text>

        

        {/* Review Input */}
        <TextInput
          placeholder="Write your review here..."
          value={userInput}
          onChangeText={setUserInput}
          style={[styles.input, styles.textArea]}
          placeholderTextColor="#555"
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={submitReview}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  reviewsList: {
    width: '100%',
    marginBottom: 20,
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  cropInfo: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cropDetails: {
    fontSize: 16,
    color: '#555',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
