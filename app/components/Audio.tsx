import React, {FunctionComponent, useState} from 'react';
import {View, Image} from 'react-native';
import TabProps from '../types/TabProps';
import {getAudioLinks, getAudioLinkText, downloadLink} from '../helpers';
import {Button, Headline, Title} from 'react-native-paper';
import styles from '../styles/components/Audio';
import {Language} from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const {full} = getAudioLinks(language);
  const {fullText} = getAudioLinkText(language);
  const [downloading, setDownloading] = useState(false);
  const [downloadingSecondary, setDownloadingSecondary] = useState(false);

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
          labelStyle={{fontSize: 20}}
          icon="download"
          mode="contained"
          uppercase={false}
          loading={downloading}
          onPress={async () => {
            const link = `${url}${full}`;
            setDownloading(true);
            await downloadLink(link, fullText);
            setDownloading(false);
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
            onPress={async () => {
              setDownloadingSecondary(true);
              await downloadLink(`${url}646`, 'Amsiggel and Bubker (audio)');
              setDownloadingSecondary(false);
            }}
            uppercase={false}
            loading={downloadingSecondary}
            labelStyle={{fontSize: 20}}
            style={{margin: 20, marginVertical: 10}}>
            Amsiggel and Bubker (audio)
          </Button>
        )}
        {language === Language.BERBER && (
          <Button
            icon="download"
            mode="contained"
            onPress={async () => {
              setDownloadingSecondary(true);
              await downloadLink(`${url}632`, 'Amsiggel d-Bubker (audio)');
              setDownloadingSecondary(false);
            }}
            loading={downloadingSecondary}
            uppercase={false}
            labelStyle={{fontSize: 20}}
            style={{margin: 20, marginVertical: 10}}>
            Amsiggel d-Bubker (audio)
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Audio;
