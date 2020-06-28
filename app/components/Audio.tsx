import React, {FunctionComponent} from 'react';
import {View, Text, Linking, Platform} from 'react-native';
import Share from 'react-native-share';
import TabProps from '../types/TabProps';
import FlagBanner from './commons/FlagBanner';
import {getAudioLinks} from '../helpers';
import {Button} from 'react-native-paper';

const Audio: FunctionComponent<TabProps> = ({language}) => {
  const url = 'https://www.amsiggel.com/download/';
  const {full, firstHalf, secondHalf} = getAudioLinks(language);
  return (
    <View>
      <Button
        icon="download"
        mode="contained"
        onPress={() => {
          const link = `${url}${full}`;
          if (Platform.OS === 'ios') {
            Share.open({
              url: link,
              saveToFiles: true,
            });
          } else {
            Linking.openURL(link);
          }
        }}>
        link 1
      </Button>
    </View>
  );
};

export default Audio;
