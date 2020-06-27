import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Audio from './components/Audio';
import Story from './components/Story';
import Video from './components/Video';
import Contact from './components/Contact';
import colors from './colors';
import {Image} from 'react-native';
import useLanguage from './hooks/UseLanguage';
import FlagBanner from './components/commons/FlagBanner';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const {language, setNewLanguage} = useLanguage();
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
          children={() => <Home language={language} />}
          options={(route) => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color}}
                source={require('./images/home.png')}
                height={size}
                width={size}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Audio"
          children={() => <Audio language={language} />}
          options={(route) => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color}}
                source={require('./images/headphone.png')}
                height={size}
                width={size}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Story"
          children={() => <Story language={language} />}
          options={(route) => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color}}
                source={require('./images/document.png')}
                height={size}
                width={size}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Video"
          children={() => <Video language={language} />}
          options={(route) => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color}}
                source={require('./images/video.png')}
                height={size}
                width={size}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Contact"
          children={() => <Contact language={language} />}
          options={(route) => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color}}
                source={require('./images/mail.png')}
                height={size}
                width={size}
              />
            ),
          })}
        />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            header: () => <FlagBanner setNewLanguage={setNewLanguage} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
