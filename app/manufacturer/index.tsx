import React, { useState } from 'react';
import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { styled } from 'nativewind';
import { Button, Card, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';



const StyledText = styled(Text);
const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledLinearGradient = styled(LinearGradient);
const StyledButton = styled(Button);

type Action = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const actions: Array<Action> = [
  { title: 'List Manufacturers', subtitle: 'Display all manufacturers assigned to you', image: 'https://picsum.photos/701', href: '/manufacturer/list' },
  { title: 'Add Manufacturer', subtitle: 'Add a new manufacturer to your list', image: 'https://picsum.photos/702', href: '/manufacturer/add' },
  { title: 'Edit Manufacturer', subtitle: 'Edit an existing manufacturer', image: 'https://picsum.photos/703', href: '/manufacturer/edit' },
]

export default function Manufacturer() {
  const [gradientColors, setGradientColors] = useState<Array<string>>(["rgba(76, 102, 159, 1)", "rgba(59, 89, 152, 1)", "rgba(5, 12, 31, 1)"]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollHeight = event.nativeEvent.contentSize.height;
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPercentage = (scrollPosition / (scrollHeight - scrollViewHeight)) * 100;

    const baseGradientColors = ["rgba(76, 102, 159, 1)", "rgba(59, 89, 152, 1)", "rgba(5, 12, 31, 1)"];

    if (baseGradientColors.length > 0) {
      const adjustBrightness = (rgbaArray: any[], percentage: number) => {
        return rgbaArray.map(color => {
          const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(\.\d+)?)\)/);
          if (!rgba) {
            throw new Error("Invalid RGBA color format");
          }

          let r = parseInt(rgba[1], 10);
          let g = parseInt(rgba[2], 10);
          let b = parseInt(rgba[3], 10);
          const a = parseFloat(rgba[4]);

          const factor = (percentage + 150) / 100;

          r = Math.min(255, Math.max(0, r * factor));
          g = Math.min(255, Math.max(0, g * factor));
          b = Math.min(255, Math.max(0, b * factor));

          return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
        });
      }

      setGradientColors(adjustBrightness(baseGradientColors, scrollPercentage));
    }
  }
  return (
    <StyledView className='pt-5 flex flex-1'>

      <StyledText className='text-gray-50 text-center text-2xl'>Discover more about your</StyledText>
      <StyledText className='text-gray-50 text-center text-2xl'>manufacturers</StyledText>
      <StyledLinearGradient colors={gradientColors} className='rounded-xl my-8 mx-2'>
        <StyledScrollView
          contentInset={{ top: 0, left: 0, bottom: 20, right: 0 }}
          className='mb-5'
          onScroll={(event) => handleScroll(event)}
        >
          <StyledView>
            {actions.map((action, index) => (
              <Card key={index} style={{ marginTop: 20, marginHorizontal: 10 }}>
                <Card.Cover style={{ marginTop: 20, marginHorizontal: 15 }} source={{ uri: action.image }} />
                <Card.Title title={action.title} subtitle={action.subtitle} />
                <Card.Actions>
                  <StyledButton mode='contained' onPress={() => { router.push(action.href) }}>Go</StyledButton>
                </Card.Actions>
              </Card>
            ))}
          </StyledView>
        </StyledScrollView>
      </StyledLinearGradient>
    </StyledView>
  );
}