import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import TabProps from '../types/TabProps';
import {getVideoIDs, getVideoDetails, getDurationString} from '../helpers';
import {VideoDetails} from '../types';
import {ActivityIndicator} from 'react-native-paper';
import Orientation from 'react-native-orientation-locker';
import colors from '../colors';
import useBackHandler from '../hooks/UseBackHandler';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('screen');

const videoHeight = width * 0.75;

const Videos: FunctionComponent<TabProps> = ({
  language,
  fullscreen,
  setFullscreen,
  video,
  setVideo,
}) => {
  const [allVideoDetails, setAllVideoDetails] = useState<VideoDetails[]>();
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(true);
  const videoRef = useRef<Video>(null);
  useEffect(() => {
    const getAllVideoDetails = async (codes: string[]) => {
      setLoading(true);
      const videosDetails = await Promise.all(
        codes.map((code) => {
          return getVideoDetails(code);
        }),
      );
      setAllVideoDetails(videosDetails);
      setLoading(false);
    };
    if (language) {
      const codes = getVideoIDs(language);
      getAllVideoDetails(codes);
    }
  }, [language]);

  useEffect(() => {
    if (fullscreen) {
      StatusBar.setHidden(true);
      setPaused(false);
    } else {
      StatusBar.setHidden(false);
      setPaused(true);
    }
  }, [fullscreen]);
  useBackHandler(() => {
    if (fullscreen) {
      setPaused(true);
      Orientation.lockToPortrait();
      return true;
    }
  });

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      {video && Platform.OS === 'android' && !loading && (
        <VideoPlayer
          source={{uri: video.videoUrl}}
          disableVolume
          disableFullscreen
          paused={paused}
          onPause={() => setPaused(true)}
          onPlay={() => setPaused(false)}
          onBack={() => Orientation.lockToPortrait()}
          onEnd={() => Orientation.lockToPortrait()}
          onError={(e: Error) => Alert.alert('Error', e.message)}
        />
      )}
      {video && Platform.OS === 'ios' && (
        <Video
          ref={videoRef}
          source={{uri: video.videoUrl}}
          paused={paused}
          onFullscreenPlayerDidPresent={() => setPaused(false)}
          onFullscreenPlayerDidDismiss={() => setPaused(true)}
          onEnd={() => videoRef.current?.dismissFullscreenPlayer()}
          onError={(e) => Alert.alert('Error', e.error.errorString)}
        />
      )}
      {allVideoDetails && !loading && !fullscreen && (
        <ScrollView>
          <View>
            {allVideoDetails.map((details) => {
              const {duration, title} = details.video;
              const durationString = getDurationString(duration);
              return (
                <View key={details.videoUrl}>
                  <TouchableOpacity
                    onPress={() => {
                      if (setVideo) {
                        setVideo(details);
                        if (Platform.OS === 'ios') {
                          setTimeout(() => {
                            videoRef.current?.presentFullscreenPlayer();
                          }, 500);
                        } else {
                          Orientation.lockToLandscape();
                        }
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{uri: details.thumbnailUrl}}
                      style={{width: 100, height: 75}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                        {title}
                      </Text>
                      <Text style={{color: colors.primary}}>
                        {durationString}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{borderBottomWidth: 0.5, borderBottomColor: '#999'}}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
      {loading && (
        <View style={{justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Videos;
