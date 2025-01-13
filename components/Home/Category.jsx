import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors } from './../../constants/Colors'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'

export default function Category({ explore = false, onCategorySelect }) {

    // Static category list with URLs and names
    const categoryList = [
        {
            name: "Wheat",
            icon2: "https://images.pexels.com/photos/54084/wheat-grain-agriculture-seed-54084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Rice",
            icon2: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Fruits",
            icon2: "https://images.pexels.com/photos/709567/pexels-photo-709567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Vegetable",
            icon2: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ];

    const router = useRouter();

    const onCategoryPressHandler = (item) => {
        if (!explore) {
            router.push('/businesslist/' + item.name);
        } else {
            onCategorySelect(item.name);
        }
    }

    return (
        <View>
            {!explore && <View style={{
                padding: 20, display: 'flex',
                flexDirection: 'row', justifyContent: 'space-between',
                marginTop: 10,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold'
                }}>
                    Category
                </Text>
                {/* <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-medium' }}>View All</Text> */}
            </View>}

            <FlatList
                data={categoryList} // Directly use static category data
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: 20 }}
                renderItem={({ item, index }) => (
                    <CategoryItem
                        category={item}
                        key={index}
                        onCategoryPress={(category) => onCategoryPressHandler(item)}
                    />
                )}
            />
        </View>
    )
}
