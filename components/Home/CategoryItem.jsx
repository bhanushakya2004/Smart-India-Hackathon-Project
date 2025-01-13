import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function CategoryItem({ category, onCategoryPress }) {
    return (
        <TouchableOpacity 
            onPress={() => onCategoryPress(category)} 
            style={{ 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: 15, // Space between items
            }}
        >
            {/* Container for the Image */}
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,  // Adjust the size of the container
                height: 100, // Adjust the size of the container
                overflow: 'hidden', // Ensures the image stays within the bounds of the container
            }}>
                <Image 
                    source={{ uri: category.icon2 }}  // Image URL from category data
                    style={{
                        width: '100%',  // Make the image fill the container width
                        height: '100%', // Make the image fill the container height
                        borderRadius: 15,  // Optional: rounds the corners of the image
                    }}
                />
            </View>
            
            {/* Category Name */}
            <Text style={{
                fontSize: 14,  // Font size for the category name
                fontFamily: 'outfit-medium',
                textAlign: 'center',
                marginTop: 5,
                color: Colors.TEXT_COLOR,  // Adjust text color as needed
            }}>
                {category.name}
            </Text>
        </TouchableOpacity>
    )
}
