import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import {getVideoDetails, getHomeVideoID} from '../helpers';
import TabProps from '../types/TabProps';
import {ActivityIndicator} from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';
import useBackHandler from '../hooks/UseBackHandler';
import globalStyles from '../styles/globalStyles';
import colors from '../colors';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('screen');

const videoHeight = width * 0.75;

const Home: FunctionComponent<TabProps> = ({
  language,
  fullscreen,
  setFullscreen,
}) => {
  const [uri, setUri] = useState('');
  const [paused, setPaused] = useState(true);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<Video>(null);
  const handleOrientation = useCallback(
    (orientation: string) => {
      orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
        ? setFullscreen(true)
        : setFullscreen(false);
    },
    [setFullscreen],
  );

  useEffect(() => {
    if (fullscreen) {
      StatusBar.setHidden(true);
      setPaused(false);
    } else {
      setPaused(true);
      StatusBar.setHidden(false);
    }
  }, [fullscreen]);

  useEffect(() => {
    const getDetails = async () => {
      if (language) {
        setLoading(true);
        const id = getHomeVideoID(language);
        console.log(id);
        const {thumbnailUrl, videoUrl, video} = await getVideoDetails(id);
        setUri(videoUrl);
        setLoading(false);
      }
    };
    getDetails();
  }, [language]);

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, [handleOrientation]);

  useEffect(() => {
    if (Platform.OS === 'android' && !Orientation.isLocked()) {
      Orientation.lockToPortrait();
    }
  }, []);

  useBackHandler(() => {
    if (fullscreen) {
      setPaused(true);
      Orientation.lockToPortrait();
      return true;
    }
  });

  if (fullscreen && uri) {
    return (
      <VideoPlayer
        source={{uri}}
        disableVolume
        disableFullscreen
        paused={paused}
        onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)}
        onBack={() => Orientation.lockToPortrait()}
        onEnd={() => Orientation.lockToPortrait()}
      />
    );
  }
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      {!loading && uri ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                videoRef.current?.presentFullscreenPlayer();
              } else {
                Orientation.lockToLandscape();
              }
            }}>
            <Video
              ref={videoRef}
              source={{uri}}
              paused={true}
              onLoad={() => videoRef.current?.seek(0)}
              //onPlay={() => setPaused(false)}
              style={{height: videoHeight}}
              resizeMode="contain"
              //controls
            />
            <View>
              <Icon
                name="play-circle"
                size={100}
                color={colors.primary}
                style={globalStyles.playButtonContainer}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator style={{marginTop: videoHeight / 2}} />
      )}
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Image source={require('../images/arraw-ad-Tifinagh-sm.png')} />
        <Image source={require('../images/arraw-ad-Latin-sm.png')} />
        <Image source={require('../images/arraw-ad-Arabic-sm.png')} />
      </View>
    </ScrollView>
  );
};

export default Home;
