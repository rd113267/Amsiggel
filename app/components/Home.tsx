import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {View, Text, SafeAreaView, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import TopBanner from './commons/TopBanner';
import useLanguage from '../hooks/UseLanguage';
import {getVideoDetails, getHomeVideoID} from '../helpers';
import Video from 'react-native-video';
import colors from '../colors';
import FlagBanner from './commons/FlagBanner';

const {width} = Dimensions.get('window');

const Home: FunctionComponent = () => {
  const [uri, setUri] = useState('');
  const [paused, setPaused] = useState(true);
  const [thumbnail, setThumbnail] = useState('');
  const {language, setNewLanguage} = useLanguage();
  const videoRef = useRef<Video>();
  useEffect(() => {
    const getDetails = async () => {
      if (language) {
        const id = getHomeVideoID(language);
        console.log(id);
        const {thumbnailUrl, videoUrl, video} = await getVideoDetails(id);
        console.log(video);
        setUri(videoUrl);
        setThumbnail(thumbnailUrl);
      }
    };
    getDetails();
  }, [language]);
  return (
    <SafeAreaView style={{backgroundColor: colors.primary}}>
      <TopBanner />
      <View style={{backgroundColor: '#fff'}}>
        <FlagBanner setNewLanguage={setNewLanguage} />
        {!!uri && (
          <View style={{height: width * 0.75}}>
            <VideoPlayer
              disableBack
              disableFullscreen
              disableVolume
              ref={videoRef}
              source={{uri}}
              paused={paused}
              onPaused={() => setPaused(true)}
              onPlay={() => setPaused(false)}
              style={{height: width * 0.75}}
            />
          </View>
        )}
        <Text />
      </View>
    </SafeAreaView>
  );
};

export default Home;
