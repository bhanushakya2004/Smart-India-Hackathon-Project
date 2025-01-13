import React from 'react';
import { View, FlatList } from 'react-native';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopularBusiness from '../../components/Home/PopularBusiness';

export default function Home() {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={[]} // No data since static content is in ListHeaderComponent
                renderItem={null} // No render items
                ListHeaderComponent={(
                    <>
                        {/* Header */}
                        <Header />
                        {/* Slider */}
                        <Slider />
                        {/* Category */}
                        <Category />
                        {/* Popular Business List */}
                        <PopularBusiness />
                    </>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
