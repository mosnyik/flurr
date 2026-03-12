import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="intentions" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="profile-builder" />
    </Stack>
  );
}
