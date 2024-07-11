import { Stack } from "expo-router";

export default function ManufacturerLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      headerBackTitle: 'Back',
    }}>
      <Stack.Screen name="index" options={{
        title: 'Manufacturer',
        headerShown: false,
        headerBackTitle: 'Back',
      }} />
    </Stack>);
}