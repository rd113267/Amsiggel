import React, {FunctionComponent, useEffect} from 'react';
import {View, Text} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import TopBanner from './commons/TopBanner';
import useLanguage from '../hooks/UseLanguage';
import {getVideoDetails, getHomeVideoID} from '../helpers';

const Home: FunctionComponent = () => {
  const {language, setNewLanguage} = useLanguage();
  useEffect(() => {
    const getDetails = async () => {
      if (language) {
        const id = getHomeVideoID(language);
        console.log(id);
        const {} = await getVideoDetails(id);
      }
    };
    getDetails();
  }, [language]);
  return (
    <View>
      <TopBanner />
      <Text />
    </View>
  );
};

export default Home;
