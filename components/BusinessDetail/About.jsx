import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff',
        marginTop:-20
       
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>About</Text>
      <Text
      style={{
        fontFamily:'outfit',
        lineHeight:25
      }}
      >Price : {business?.price}</Text>
      <Text
      style={{
        fontFamily:'outfit',
        lineHeight:25
      }}
      >Farmer Name : {business?.farmername}</Text>
      <Text
      style={{
        fontFamily:'outfit',
        lineHeight:25
      }}
      >Description : {business?.desc}</Text>
      
      
    </View>
  )
}