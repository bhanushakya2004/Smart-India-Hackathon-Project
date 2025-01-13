import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function PopularBusinessCard({ business }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push("/businessdetail/" + business?.id)}
            style={{
                width: '48%', // Adjust width to fit two cards in a row
                backgroundColor: '#fff',
                borderRadius: 15,
                overflow: 'hidden',
            }}
        >
            <Image
                source={{ uri: business?.imageurl }}
                style={{
                    width: '100%',
                    height: 130,
                }}
            />
            <View style={{ padding: 10 }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 17,
                    marginBottom: 5,
                }}>
                    {business.name}
                </Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 13,
                    color: Colors.GRAY,
                }}>
                    {business.price}
                </Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 13,
                    color: Colors.GRAY,
                }}>
                    {business.address}
                </Text>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                        <Image
                            source={require('./../../assets/images/star.png')}
                            style={{
                                width: 15,
                                height: 15,
                            }}
                        />
                        <Text style={{ fontFamily: 'outfit' }}>4.5</Text>
                    </View>
                    <Text
                        style={{
                            fontFamily: 'outfit',
                            backgroundColor: Colors.PRIMARY,
                            color: '#fff',
                            padding: 3,
                            fontSize: 10,
                            borderRadius: 5,
                        }}
                    >
                        {business.category}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
