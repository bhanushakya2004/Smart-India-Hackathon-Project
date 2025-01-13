import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { query } from 'firebase/database';
import { collection, doc, getDoc, where } from 'firebase/firestore';
import {db2} from './../../configs/FirebaseConfig'
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';
export default function BusinessDetail() {

  const {businessid}=useLocalSearchParams();
  const [business,setBusiness]=useState();
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
      GetBusinessDetailById();
    },[])
  /**
   * Used to get BusinessDetail by
   */
   const GetBusinessDetailById=async()=>{
    setLoading(true);
     const docRef=doc(db2,'crops',businessid);
     const docSnap=await getDoc(docRef);
     if (docSnap.exists()) {
      setBusiness({id:docSnap.id,...docSnap.data()});
      setLoading(false)
    } else {
      console.log("No such document!");
      setLoading(false)

    }
   }
  return (
    <ScrollView>
      {loading?
      <ActivityIndicator
      style={{
        marginTop:'70%'
      }}
      size={'large'}
      color={Colors.PRIMARY}
      />:  
      <View>
        {/* Intro  */}
        <Intro business={business} />
        {/* Action Buttons  */}
        <ActionButton business={business} />
        {/* About Section  */}
        <About business={business} />

        
        {/* Review Section  */}
        <Reviews business={business} />
     
      </View>
    }
     
    </ScrollView>
  )
}