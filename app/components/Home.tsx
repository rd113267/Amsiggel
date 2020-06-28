import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Dimensions,
  Alert,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import {getVideoDetails, getHomeVideoID} from '../helpers';
import TabProps from '../types/TabProps';
import {ActivityIndicator} from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';
import useBackHandler from '../hooks/UseBackHandler';

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
    fullscreen ? StatusBar.setHidden(true) : StatusBar.setHidden(false);
  }, [fullscreen]);

  useEffect(() => {
    const getDetails = async () => {
      if (language) {
        setLoading(true);
        const id = getHomeVideoID(language);
        console.log(id);
        const {thumbnailUrl, videoUrl, video} = await getVideoDetails(id);
        console.log(video);
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

  useBackHandler(() => {
    if (fullscreen) {
      setPaused(true);
      Orientation.unlockAllOrientations();
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
        onBack={() => {
          setPaused(true);
          Orientation.unlockAllOrientations();
        }}
        onEnd={() => Orientation.unlockAllOrientations()}
      />
    );
  }
  return (
    <>
      {!loading && uri ? (
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              setPaused(false);
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
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator style={{marginTop: videoHeight / 2}} />
      )}
      <Text />
    </>
  );
};

export default Home;
