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
  Alert,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import {getVideoDetails, getVideoIDs} from '../helpers';
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
  const [loading, setLoading] = useState(true);
  const [videoDetails, setVideoDetails] = useState<VideoDetails>();
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<Video>(null);
  const videoPlayerRef = useRef<Video>(null);
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
    const getDetails = async (code: string) => {
      setLoading(true);
      const videosDetails = await getVideoDetails(code);
      setVideoDetails(videosDetails);
      setLoading(false);
    };
    if (language) {
      const codes = getVideoIDs(language);
      const code = codes[currentVideo];
      getDetails(code);
    }
  }, [currentVideo, language]);

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

  const goNextVideo = () => {
    if (Platform.OS === 'ios') {
      setPaused(true);
      videoRef.current?.dismissFullscreenPlayer();
      setTimeout(() => {
        if (currentVideo < videosLength) {
          setCurrentVideo(currentVideo + 1);
        } else {
          setCurrentVideo(0);
        }
      }, 500);
    } else {
      videoPlayerRef.current?.seek(0);
      if (currentVideo < videosLength) {
        setCurrentVideo(currentVideo + 1);
      } else {
        setCurrentVideo(0);
      }
    }
  };

  if (fullscreen && videoDetails) {
    if (loading) {
      return (
        <View style={{backgroundColor: '#000', flex: 1}}>
          <ActivityIndicator style={{marginTop: videoHeight / 2}} />
        </View>
      );
    } else {
      return (
        <VideoPlayer
          source={{uri: videoDetails.videoUrl}}
          disableVolume
          disableFullscreen
          paused={paused}
          onPause={() => setPaused(true)}
          onPlay={() => setPaused(false)}
          onBack={() => Orientation.lockToPortrait()}
          onEnd={goNextVideo}
          ref={(videoPlayer: any) => {
            if (videoPlayer) {
              videoPlayer.current = videoPlayer.player.ref;
            }
          }}
          onError={(e: Error) => Alert.alert('Error', e.message)}
        />
      );
    }
  }
  return (
    <View style={{backgroundColor: '#fff', justifyContent: 'center', flex: 1}}>
      {!loading && videoDetails ? (
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
              source={{uri: videoDetails.videoUrl}}
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
              onError={(e) => Alert.alert('Error', e.error.errorString)}
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
