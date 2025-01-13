import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
        <View style={{
            display:'flex',
            alignItems:'center',
            marginTop:100
        }}>
        <Image source={require('./../assets/images/1.jpeg')}
            style={{
                width:220,
                height:450,
                borderRadius:20,
                borderWidth:6,
                borderColor:'#000'
            }}
        />
        </View>

        <View style={styles.subContainer}>
            <Text style={{
                fontSize:30,
                fontFamily:'outfit-bold',
                textAlign:'center'
            }}>Your Only 
                <Text style={{
                    color:Colors.PRIMARY,
                }}> App to Buy Fresh Grains</Text> and Vegetables</Text>
            <Text style={{
                fontSize:15,
                fontFamily:'outfit',
                textAlign:'center',
                marginVertical:15,
                color:Colors.GRAY
            }}>Find all fresh and natural crops in one app and connect with local farmers</Text>

            <TouchableOpacity style={styles.btn} 
            onPress={onPress}
            >
                <Text style={{
                    textAlign:'center',
                    color:'#fff',
                    fontFamily:'outfit'
                }} >Login/SignUp For KrashakSetu</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    subContainer:{
        backgroundColor:'#fff',
        padding:20,
        marginTop:-20,
        
    },
    btn:{
        backgroundColor:Colors.PRIMARY,
        padding:16,
        borderRadius:99,
        marginTop:20
    }
})