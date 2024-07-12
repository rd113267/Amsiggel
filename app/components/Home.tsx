import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import {getVideoDetails, getVideoURLs} from '../helpers';
import TabProps from '../types/TabProps';
import {ActivityIndicator} from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';
import useBackHandler from '../hooks/UseBackHandler';
import globalStyles from '../styles/globalStyles';
import colors from '../colors';
import {VideoDetails} from '../types';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('screen');
const videosLength = 17;

const videoHeight = width * 0.75;

const Home: FunctionComponent<TabProps> = ({
  language,
  fullscreen,
  setFullscreen,
}) => {
  const [paused, setPaused] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (fullscreen) {
      StatusBar.setHidden(true);
      setPaused(false);
    } else {
      setPaused(true);
      StatusBar.setHidden(false);
    }
  }, [fullscreen]);

  const videoUrl = language ? getVideoURLs(language)[currentVideo] : '';

  const loading = !videoUrl;

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

  const goNextVideo = () => {
    if (Platform.OS === 'ios') {
      setPaused(true);
      videoRef.current?.dismissFullscreenPlayer();
      if (currentVideo < videosLength) {
        setCurrentVideo(currentVideo + 1);
      } else {
        setCurrentVideo(0);
      }
      setTimeout(() => {
        setPaused(false);
        videoRef.current?.presentFullscreenPlayer();
      }, 500);
    } else {
      if (currentVideo < videosLength) {
        setCurrentVideo(currentVideo + 1);
      } else {
        setCurrentVideo(0);
      }
    }
  };

  if (fullscreen && videoUrl) {
    if (loading) {
      return (
        <View style={{backgroundColor: '#000', flex: 1}}>
          <ActivityIndicator style={{marginTop: videoHeight / 2}} />
        </View>
      );
    } else {
      return (
        <VideoPlayer
          source={{uri: videoUrl}}
          disableVolume
          disableFullscreen
          paused={paused}
          onPause={() => setPaused(true)}
          onPlay={() => setPaused(false)}
          onBack={() => Orientation.lockToPortrait()}
          onEnd={goNextVideo}
          onError={(e: Error) => Alert.alert('Error', e.message)}
        />
      );
    }
  }
  return (
    <View style={{backgroundColor: '#fff', justifyContent: 'center', flex: 1}}>
      {!loading ? (
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
              source={{uri: videoUrl}}
              paused={paused || Platform.OS === 'android'}
              onLoad={() => {
                if (Platform.OS === 'android') {
                  videoRef.current?.seek(0);
                }
              }}
              style={{height: videoHeight}}
              resizeMode="contain"
              onFullscreenPlayerDidPresent={() => setPaused(false)}
              onFullscreenPlayerDidDismiss={() => setPaused(true)}
              onEnd={goNextVideo}
              onError={e => Alert.alert('Error', e.error.errorString)}
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
    </View>
  );
};

export default Home;
