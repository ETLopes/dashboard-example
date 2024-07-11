import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledText = styled(Text);

export default function Manufacturer() {
  return (
    <View>
      <StyledText className='text-gray-50'>Manufacturer</StyledText>
    </View>
  );
}