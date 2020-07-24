import React, {FunctionComponent} from 'react';
import {View, Image, SafeAreaView} from 'react-native';
import TabProps from '../types/TabProps';
import {getAudioLinks, getAudioLinkText, downloadLink} from '../helpers';
import {Button, Headline, Title} from 'react-native-paper';
import styles from '../styles/components/Audio';
import {Language} from '../types';

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Title
        style={{
          textAlign: 'center',
          fontSize: 30,
          marginTop: 20,
        }}>
        audio
      </Title>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          {firstRowImages.map((image) => {
            return (
              <Image
                key={image}
                style={{flex: 1}}
                resizeMode="contain"
                source={image}
              />
            );
          })}
        </View>
        <Button
          style={styles.button}
          labelStyle={{ fontSize: 20 }}
          icon="download"
          mode="contained"
          uppercase={false}
          onPress={() => {
            const link = `${url}${full}`;
            downloadLink(link);
          }}>
          {fullText}
        </Button>
        <View style={{flexDirection: 'row'}}>
          {secondRowImages.map((image) => {
            return (
              <Image
                key={image}
                style={{flex: 1}}
                resizeMode="contain"
                source={image}
              />
            );
          })}
        </View>
        {language === Language.ENGLISH && (
          <Button
            icon="download"
            mode="contained"
            onPress={() => downloadLink(`${url}646`)}
            uppercase={false}
            labelStyle={{ fontSize: 20 }}
            style={{margin: 10}}>
            Amsiggel and Bubker (audio)
          </Button>
        )}
        {language === Language.BERBER && (
          <Button
            icon="download"
            mode="contained"
            onPress={() => downloadLink(`${url}632`)}
            uppercase={false}
            labelStyle={{ fontSize: 20 }}
            style={{margin: 10}}>
            Amsiggel d-Bubker (audio)
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Audio;
