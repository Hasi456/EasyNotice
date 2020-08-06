import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import QA_Screen from './QA_Screen';
import BookmarkScreen from './BookmarkScreen';
import NewsScreen from './NewsScreen';


const HomeStack = createStackNavigator();
const QA_Stack = createStackNavigator();
const NewsStack= createStackNavigator();
const BookmarkStack=createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#1C1C1C',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={QA_StackScreen}
        options={{
          tabBarLabel: 'Private Messages',
          tabBarColor: '#1C1C1C',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStackScreen}
        options={{
          tabBarLabel: 'News Feed',
          tabBarColor: '#1C1C1C',
          tabBarIcon: ({ color }) => (
            <Icon name="newspaper" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarkStackScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarColor: '#1C1C1C',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-bookmark" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1C1C1C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Overview',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1C1C1C" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

const QA_StackScreen = ({navigation}) => (
<QA_Stack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1C1C1C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <QA_Stack.Screen name="Notifications" component={QA_Screen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1C1C1C" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</QA_Stack.Navigator>
);

const NewsStackScreen = ({navigation}) => (
  <NewsStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1C1C1C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <NewsStack.Screen name="News Feed" component={NewsScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#1C1C1C" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </NewsStack.Navigator>
  );
  
  const BookmarkStackScreen = ({navigation}) => (
    <BookmarkStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#1C1C1C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <BookmarkStack.Screen name="favourites" component={BookmarkScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1C1C1C" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </BookmarkStack.Navigator>
    );
      
  