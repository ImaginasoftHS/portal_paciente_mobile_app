// app/tabs/_layout.tsx
import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Tabs, useRouter } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
 
const HomeRoute = () => <Tabs.Screen name="index" />;
const SettingsRoute = () => <Tabs.Screen name="settings" />;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'settings', title: 'Settings', icon: 'settings' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    settings: SettingsRoute,
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};


