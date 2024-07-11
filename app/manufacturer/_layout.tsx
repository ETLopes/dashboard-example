import { Stack } from "expo-router";

export default function ManufacturerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{
        title: 'Manufacturer',
      }} />
    </Stack >);
}