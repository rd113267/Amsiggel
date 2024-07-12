import React, {useState, useEffect, useCallback} from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator, Header} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Home from './components/Home';
import Audio from './components/Audio';
import Story from './components/Story';
import Links from './components/Links';
import Contact from './components/Contact';
import colors from './colors';
import {Alert, Image, Platform} from 'react-native';
import useLanguage from './hooks/UseLanguage';
import FlagBanner from './components/commons/FlagBanner';
import Orientation from 'react-native-orientation-locker';
import {VideoDetails, Language} from './types';
import Legal from './components/Legal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export type RootStackParamList = {
  Tabs: undefined;
  Legal: undefined;
  Home: undefined;
  Audio: undefined;
  Story: undefined;
  Video: undefined;
  Contact: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
  },
};

const App = () => {
  const {language, setNewLanguage} = useLanguage();
  const [fullscreen, setFullscreen] = useState(false);
  const [video, setVideo] = useState<VideoDetails>();
  const handleOrientation = useCallback(
    (orientation: string) => {
      orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
        ? setFullscreen(true)
        : setFullscreen(false);
    },
    [setFullscreen],
  );
  useEffect(() => {
    if (Platform.OS === 'android') {
      Orientation.addOrientationListener(handleOrientation);

      return () => {
        Orientation.removeOrientationListener(handleOrientation);
      };
    }
  }, [handleOrientation]);

  const Tabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: colors.primary,
            display: fullscreen ? 'none' : 'flex',
          },
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          key="Home"
          children={({navigation}) => (
            <Home
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
              navigation={navigation}
            />
          )}
          options={route => ({
            tabBarVisible: !fullscreen,
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color, height: size, width: size}}
                source={require('./images/home.png')}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Audio"
          key="Audio"
          children={({navigation}) => (
            <Audio
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
              navigation={navigation}
            />
          )}
          options={route => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color, height: size, width: size}}
                source={require('./images/headphone.png')}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Story"
          key="Story"
          children={({navigation}) => (
            <Story
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
              navigation={navigation}
            />
          )}
          options={route => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color, height: size, width: size}}
                source={require('./images/document.png')}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Video"
          key="Video"
          children={({navigation}) => (
            <Links
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
              video={video}
              setVideo={setVideo}
              navigation={navigation}
            />
          )}
          options={route => ({
            tabBarVisible: !fullscreen,
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="link" size={size} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="Contact"
          key="Contact"
          children={({navigation}) => (
            <Contact
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
              navigation={navigation}
            />
          )}
          options={route => ({
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="whatsapp" size={size} color={color} />
            ),
          })}
        />
      </Tab.Navigator>
    );
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={({route}) => ({
                headerShown: !fullscreen,
                headerTitle: '',
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                  color: '#fff',
                },
                header: props => {
                  //@ts-ignore
                  const name = getFocusedRouteNameFromRoute(route);
                  if (name === 'Home') {
                    return <FlagBanner setNewLanguage={setNewLanguage} />;
                  }
                  return null;
                },
              })}
            />
            <Stack.Screen
              name="Legal"
              key="Legal"
              children={() => <Legal language={language} />}
              options={() => ({
                headerTitle:
                  language && language === Language.ENGLISH
                    ? 'Legal'
                    : 'Mentions légales',
                headerBackTitleStyle: {display: 'none'},
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
