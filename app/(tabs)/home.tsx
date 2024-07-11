import { View, Text, Pressable } from 'react-native';
import { useEffect, useContext } from 'react';
import { router } from 'expo-router'
import { styled } from 'nativewind';

import { ThemedView } from '@/components/ThemedView';
import { AuthContext } from '@/context/AuthContext';
import { Icon, MD3Colors } from 'react-native-paper';

const StyledTitle = styled(Text);

const StyledView = styled(View);
const StyledThemedView = styled(ThemedView);
const StyledIcon = styled(Icon)

export default function HomeScreen() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth.authenticated) {
      router.push("/index");
    }

  }, [auth.authenticated])

  const items = [{
    title: 'Manufacturers',
    icon: 'factory',
    href: '/manufacturer'
  }, {
    title: 'Clients',
    icon: 'account',
    href: '/manufacturer'
  }, {
    title: 'Orders',
    icon: 'note-text',
    href: '/manufacturer'
  }, {
    title: 'Prospects',
    icon: 'magnify-plus',
    href: '/manufacturer'
  }]

  return (
    <StyledThemedView className='pt-8 h-full w-full flex flex-1'>
      <StyledView>
        <StyledTitle className="text-white font-bold text-3xl text-center">Home</StyledTitle>
      </StyledView>
      <StyledView className="flex-1 justify-center items-center">
        <StyledView className="pt-3 flex-1 flex-row gap-x-1 gap-y-12 justify-evenly content-center flex-wrap">
          {items.map((item, index) => (
            <Pressable key={index} onPress={() => router.push(item.href)}>
              <StyledView className="bg-white rounded-lg p-4 mt-4 h-36 w-36 justify-around items-center" >
                <StyledTitle className="text-black font-bold text-lg text-center">{item.title}</StyledTitle>
                <StyledIcon source={item.icon} color={MD3Colors.tertiary50} size={30} />
              </StyledView>
            </Pressable>
          ))}

        </StyledView>
      </StyledView>
    </StyledThemedView>
  );
}
