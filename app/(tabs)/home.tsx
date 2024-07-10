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
    if (!auth.authenticated) {
      router.push("/index");
    }
    
  }, [auth.authenticated])

  return (
    <ThemedView style={{height: '100%', width:"auto"}}>
      <View style={{ flex: 1, justifyContent: "center", alignItems:"center"}}>
        <Text>Home Screen</Text>
      </View>
    </ThemedView>
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
