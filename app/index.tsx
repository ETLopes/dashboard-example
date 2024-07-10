import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import * as AppleAuthentication from 'expo-apple-authentication';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import {router } from "expo-router"
import { Banner } from 'react-native-paper';


export default function Home() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState('')

  useEffect(() => {
    if (authenticated) {
      router.push("/home")
    }
  }, [authenticated]);
  

  const handleSignIn = (credential: AppleAuthentication.AppleAuthenticationCredential) => {    
    if (credential.authorizationCode) { 
    setAuthenticated(true);
    router.push("/home")
    } else {
      setError('Invalid credentials')
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
      >
        {error ?     <Banner
      visible={Boolean(error)}
      actions={[
        {
          label: 'Dismiss',
          onPress: () => setError(''),
        },
      ]}
      >
      There was a problem Signing in. Please Try again.
    </Banner> : null}
      <ThemedView style={{height: 400, width:"auto"}}>
        <View style={{ flex: 1, justifyContent: "center", alignItems:"center"}}>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.button}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                if (credential.authorizationCode) {
                  handleSignIn(credential)
                }
              } catch (e: any) {
                if (e.code === 'ERR_REQUEST_CANCELED') {
                  // handle that the user canceled the sign-in flow
                } else {
                  // handle other errors
                }
              }
            }}
          />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    width: 200,
    height: 44,
  },
});
