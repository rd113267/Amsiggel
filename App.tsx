import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './app/components/Home';
import Audio from './app/components/Audio';
import Story from './app/components/Story';
import Video from './app/components/Video';
import Contact from './app/components/Contact';
import colors from './app/colors';
import {Image} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.secondary,
        inactiveTintColor: '#fff',
        style: {backgroundColor: colors.primary},
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={(route) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{tintColor: color}}
              source={require('./app/images/home.png')}
              height={size}
              width={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Audio"
        component={Audio}
        options={(route) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{tintColor: color}}
              source={require('./app/images/headphone.png')}
              height={size}
              width={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Story"
        component={Story}
        options={(route) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{tintColor: color}}
              source={require('./app/images/document.png')}
              height={size}
              width={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Video"
        component={Video}
        options={(route) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{tintColor: color}}
              source={require('./app/images/video.png')}
              height={size}
              width={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={(route) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{tintColor: color}}
              source={require('./app/images/mail.png')}
              height={size}
              width={size}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
