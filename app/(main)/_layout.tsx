import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FlurrColors } from '@/constants/theme';
import { HapticTab } from '@/components/haptic-tab';

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: FlurrColors.black,
        tabBarInactiveTintColor: FlurrColors.lightGray,
        tabBarStyle: {
          backgroundColor: FlurrColors.white,
          borderTopColor: FlurrColors.chipBackground,
        },
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'chats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'events',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
