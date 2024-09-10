import React from 'react'
import { Tabs } from 'expo-router'
import { Image, Text, View } from 'react-native'
import icons from '@/constants/icons';

const TabBarIcon = ({ name, color, icon, focused }) => {
    return (
        <View className="justify-center items-center gap-2">
            <Image
                source={icon}
                resizeMode='contain'
                className="w-6 h-6"
                tintColor={color}
            />
            <Text className={`${focused ? "font-semibold" : "font-pregular"} text-xs`} style={{ color: color }} >{name}</Text>
        </View>
    )
}

const TabLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                //this will pass as color in tab bar icon function
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    paddingTop: 20,
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 84
                }
            }}>
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => <TabBarIcon
                            name={"Home"}
                            focused={focused}
                            color={color}
                            icon={icons.home}
                        />,
                    }}
                />
                <Tabs.Screen
                    name='bookmark'
                    options={{
                        title: 'Bookmark',
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => <TabBarIcon
                            name={"Bookmark"}
                            focused={focused}
                            color={color}
                            icon={icons.bookmark}
                        />,
                    }}
                />
                <Tabs.Screen
                    name='create'
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => <TabBarIcon
                            name={"Create"}
                            focused={focused}
                            color={color}
                            icon={icons.plus}
                        />,
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => <TabBarIcon
                            name={"Proifle"}
                            focused={focused}
                            color={color}
                            icon={icons.home}
                        />,
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabLayout

