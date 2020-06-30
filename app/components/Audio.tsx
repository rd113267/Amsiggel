import React, {FunctionComponent} from 'react';
import {View, Text, Linking, Platform, Image} from 'react-native';
import Share from 'react-native-share';
import TabProps from '../types/TabProps';
import FlagBanner from './commons/FlagBanner';
import {getAudioLinks, getAudioLinkText} from '../helpers';
import {Button} from 'react-native-paper';
import styles from '../styles/components/Audio';

const image1 = require('../images/audio1.jpg');
const image2 = require('../images/audio2.jpg');
const image3 = require('../images/audio3.jpg');
const image4 = require('../images/audio4.jpg');
const image5 = require('../images/audio5.jpg');
const image6 = require('../images/audio6.jpg');
const image7 = require('../images/audio7.jpg');
const image8 = require('../images/audio8.jpg');

const firstRowImages = [image1, image2, image3, image4];
const secondRowImages = [image5, image6, image7, image8];

const Audio: FunctionComponent<TabProps> = ({language}) => {
  const url = 'https://www.amsiggel.com/download/';
  const {full, firstHalf, secondHalf} = getAudioLinks(language);
  const {fullText, firstHalfText, secondHalfText} = getAudioLinkText(language);
  const openLink = (link: string) => {
    if (Platform.OS === 'ios') {
      Share.open({
        url: link,
        saveToFiles: true,
      });
    } else {
      Linking.openURL(link);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        {firstRowImages.map((image) => {
          return (
            <Image style={{flex: 1}} resizeMode="contain" source={image} />
          );
        })}
      </View>
      <Button
        style={styles.button}
        icon="download"
        mode="contained"
        uppercase={false}
        onPress={() => {
          const link = `${url}${full}`;
          openLink(link);
        }}>
        {fullText}
      </Button>
      <View style={{flexDirection: 'row'}}>
        {secondRowImages.map((image) => {
          return (
            <Image style={{flex: 1}} resizeMode="contain" source={image} />
          );
        })}
      </View>
    </View>
  );
};

export default Audio;
