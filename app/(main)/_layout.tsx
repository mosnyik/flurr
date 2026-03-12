import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/ui/custom-tab-bar';

export default function MainLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'chats',
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'events',
        }}
      />
    </Tabs>
  );
}
