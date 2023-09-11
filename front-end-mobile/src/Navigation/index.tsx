import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import HomePage from '../screens/HomePage';
import History from '../screens/History';
import BuatLaporanFoto from '../screens/BuatLaporanFoto';
import News from '../screens/News';
import Settings from '../screens/Settings';
import {
  IconHome,
  IconLaporan,
  IconRiwayat,
  IconSetting,
  iconNews,
} from '../assets/icons';
import {MyColor} from '../components/atoms/MyColor';
import RedirectPage from '../screens/RedirectPage';

const Tab = createBottomTabNavigator();

const CostumTab = ({children, onPress}: any) => (
  <TouchableOpacity
    style={{justifyContent: 'center', alignItems: 'center'}}
    onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: MyColor.Primary,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Stack = createNativeStackNavigator();

const BuatLaporanFotoStack = () => {
  return (
    <Stack.Navigator initialRouteName="BuatLaporanFotoStack">
      <Stack.Screen
        name="BuatLaporanFotoStack"
        component={BuatLaporanFoto}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: style.tabContainer,
      }}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={IconHome}
                resizeMode="contain"
                style={{tintColor: focused ? MyColor.Primary : '#121212'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={IconRiwayat}
                resizeMode="contain"
                style={{tintColor: focused ? MyColor.Primary : '#121212'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="BuatLaporanFoto"
        component={RedirectPage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={IconLaporan}
              resizeMode="contain"
              style={{
                tintColor: focused ? MyColor.Light : '#ffffff',
              }}
            />
          ),
          tabBarButton: props => <CostumTab {...props} />,
        }}
      />

      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={iconNews}
                resizeMode="contain"
                style={{tintColor: focused ? MyColor.Primary : '#121212'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={IconSetting}
                resizeMode="contain"
                style={{tintColor: focused ? MyColor.Primary : '#121212'}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const style = StyleSheet.create({
  tabContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 60,
    margin: 20,
    elevation: 5,
  },
});