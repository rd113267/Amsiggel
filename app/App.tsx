import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, Header} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
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
          key="Home"
          children={() => (
            <Home
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
            />
          )}
          options={(route) => ({
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
          children={() => (
            <Audio
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
            />
          )}
          options={(route) => ({
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
          children={() => (
            <Story
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
            />
          )}
          options={(route) => ({
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
          children={() => (
            <Video
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
            />
          )}
          options={(route) => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color, height: size, width: size}}
                source={require('./images/video.png')}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Contact"
          key="Contact"
          children={() => (
            <Contact
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
              language={language}
            />
          )}
          options={(route) => ({
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{tintColor: color, height: size, width: size}}
                source={require('./images/mail.png')}
              />
            ),
          })}
        />
      </Tab.Navigator>
    );
  };
  return (
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
              header: (props) => {
                //@ts-ignore
                if (!route.state || route.state.index === 0) {
                  return <FlagBanner setNewLanguage={setNewLanguage} />;
                }
                // return <Header {...props} />;
                return null;
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
