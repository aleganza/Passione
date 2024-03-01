import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textSupporting,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: true,
                tabBarStyle: { backgroundColor: Colors.background },
                headerStyle: { backgroundColor: Colors.transparent },
                headerTintColor: Colors.text,
                headerTransparent: true,
                headerShadowVisible: false,
                headerBackground: () => (
                    <BlurView intensity={100} tint='dark' style={{ flex: 1}} />
                ),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => <AntDesign name="search1" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Library',
                    tabBarIcon: ({ color }) => <AntDesign name="book" size={28} color={color} />
                }}
            />
        </Tabs>
    );
}
