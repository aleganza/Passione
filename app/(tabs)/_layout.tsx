import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textSupporting,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
                tabBarStyle: { backgroundColor: Colors.background },
                headerStyle: { backgroundColor: Colors.background },
                headerTintColor: Colors.text
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => <AntDesign name="search1" size={28} color={color} />
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
