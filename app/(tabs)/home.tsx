import { Image, StyleSheet, View } from 'react-native';
import {useState, useEffect, useContext} from 'react';

import * as AppleAuthentication from 'expo-apple-authentication';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Text } from 'react-native-paper';
import { AuthContext } from '@/context/AuthContext';
import {router } from 'expo-router'


export default function HomeScreen() {
  const auth = useContext(AuthContext);
  
  useEffect(() => {
    auth.setAuthenticated(false)
    return () => {if (!auth.authenticated) {
      router.push("/login");
    }}
  }, [auth.authenticated]);

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
      <ThemedView style={{height: 400, width:"auto"}}>
        <View style={{ flex: 1, justifyContent: "center", alignItems:"center"}}>
          <Text>Home Screen</Text>
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
