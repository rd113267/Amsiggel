import React, {FunctionComponent, useState} from 'react';
import {Text, View, Image, SafeAreaView} from 'react-native';
import TabProps from '../types/TabProps';
import {Language} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {downloadLink} from '../helpers';

const image1 = require('../images/audio9.jpg');
const image2 = require('../images/audio10.jpg');
const image3 = require('../images/audio11.jpg');
const image4 = require('../images/audio12.jpg');
const image5 = require('../images/audio13.jpg');
const image6 = require('../images/audio14.jpg');
const image7 = require('../images/audio15.jpg');
const image8 = require('../images/audio16.jpg');

const firstRowImages = [image1, image2, image3, image4];
const secondRowImages = [image5, image6, image7, image8];

const Story: FunctionComponent<TabProps> = ({language}) => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const baseURL = 'https://www.amsiggel.com/wp-content/uploads/dlm_uploads/';
  const berberLinks = [
    `${baseURL}2014/05/Amsiggel-Tifinagh-transcription.pdf`,
    `${baseURL}2014/07/Amsiggel%20caracteres%20latins.pdf`,
    `${baseURL}2014/07/Amsiggel%20caracteres%20arabes.pdf`,
  ];
  const englishLink = `${baseURL}2014/05/Amsiggel-English-translation.pdf`;
  const frenchLink = `${baseURL}2016/01/Amsiggel-French.pdf`;

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      {language === Language.BERBER && (
        <View>
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
          {berberLinks.map((link, index) => {
            return (
              <TouchableOpacity
                key={link}
                onPress={() => downloadLink(link)}
                style={{
                  backgroundColor: colors.primary,
                  margin: 20,
                  marginBottom: 10,
                  borderRadius: 5,
                  padding: 5,
                }}>
                {index === 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name="download"
                      color="#fff"
                      style={{fontSize: 18, marginRight: 10, marginTop: 5}}
                    />
                    <Image
                      source={require('../images/tifinagh.png')}
                      style={{width: 70, height: 30}}
                      resizeMode="contain"
                    />
                  </View>
                )}
                {index === 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name="download"
                      color="#fff"
                      style={{fontSize: 18, marginRight: 10, marginTop: 5}}
                    />
                    <Text style={{color: '#fff', fontSize: 20}}>Latin</Text>
                  </View>
                )}
                {index === 2 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name="download"
                      color="#fff"
                      style={{fontSize: 18, marginRight: 10, marginTop: 5}}
                    />
                    <Image
                      source={require('../images/arabic.png')}
                      style={{width: 70, height: 30}}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
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
        </View>
      )}
    </SafeAreaView>
  );
};

export default Story;
