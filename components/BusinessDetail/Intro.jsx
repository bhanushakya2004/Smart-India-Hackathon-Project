import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db2 } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
export default function Intro({business}) {
 
    const router=useRouter();
    const {user}=useUser();
    const OnDelete=()=>{
        Alert.alert('Do you want to Delete?','Do you really want to Delete this business?',[
            {
                text:'Cancel',
                style:'cancel',
                
            },
            {
                text:'Delete',
                style:'destructive',
                onPress:()=>deleteBusiness()
            }
        ])
    }

    const deleteBusiness=async()=>{
        console.log("Delete Business");
        await deleteDoc(doc(db2,'crops',business?.id));
        router.back();
        ToastAndroid.show('Business Deleted!',ToastAndroid.LONG)
    }
    return (
    <View>
        <View style={{
            position:'absolute',
            zIndex:10,
            display:'flex',
            marginTop:40,
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            padding:20
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back-circle" size={50} color="white" />
            </TouchableOpacity>

        {/* <Ionicons name="heart-outline" size={40} color="white" /> */}
        </View>
        <Image source={{uri:business?.imageurl}}
            style={{
                width:'100%',
                height:340
            }}
        />

            <View
            style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                padding:20,
                marginTop:-20,
                backgroundColor:'#fff',
                borderTopLeftRadius:25,
                borderTopRightRadius:25,
            }}
            >
        <View style={{
            padding:20,
            marginTop:-20,
            backgroundColor:'#fff',
            borderTopLeftRadius:25,
            borderTopRightRadius:25
        }}>
            <Text style={{
                fontSize:26,
                fontFamily:'outfit-bold'
            }}>{business?.name}
           
            </Text>
            
            <Text
            style={{
                fontFamily:'outfit',
                fontSize:18
            }}
            >From : {business?.address}</Text>

        </View>
       {user?.primaryEmailAddress?.emailAddress==business?.userEmail&& <TouchableOpacity onPress={()=>OnDelete()}>
        <Ionicons name="trash" size={24} color="red" />

        </TouchableOpacity>}
        </View>
    </View>
  )
}