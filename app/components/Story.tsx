import React, {FunctionComponent, useState} from 'react';
import {Text, View, Image, SafeAreaView, ScrollView} from 'react-native';
import TabProps from '../types/TabProps';
import {Language} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {downloadLink} from '../helpers';
import {Button, Title} from 'react-native-paper';

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
  const baseURL = 'https://www.amsiggel.com/wp-content/uploads/dlm_uploads/';
  const berberLinks = [
    `${baseURL}2014/05/Amsiggel-Tifinagh-transcription.pdf`,
    `${baseURL}2014/07/Amsiggel%20caracteres%20latins.pdf`,
    `${baseURL}2014/07/Amsiggel%20caracteres%20arabes.pdf`,
  ];
  const englishLink = `${baseURL}2014/05/Amsiggel-English-translation.pdf`;
  const frenchLink = `${baseURL}2016/01/Amsiggel-French.pdf`;

  const englishPDF = `${baseURL}2014/07/Bubker%20traduction%20anglaise.pdf`;

  const berberPDFs = [
    `${baseURL}2014/06/Bubker-Tifinagh-transcription.pdf`,
    `${baseURL}2014/07/Bubker%20caracteres%20latins.pdf`,
    `${baseURL}2014/06/Bubker-Arabic-transcription.pdf`,
  ];

  const frenchPDF =
    'https://www.amsiggel.com/wp-content/uploads/2016/01/Conversation-avec-Bubker.pdf';

  const getTitle = () => {
    if (language === Language.ENGLISH) {
      return 'Texts';
    }
    if (language === Language.FRENCH) {
      return 'Textes';
    }
    return 'arratn ';
  }

  const getTitleText = () => {
    if (language === Language.ENGLISH) {
      return 'Amsiggel and Bubker';
    }
    if (language === Language.FRENCH) {
      return 'Amsiggel et Bubker';
    }
    return 'Amsiggel d-Bubker';
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Title
        style={{
          textAlign: 'center',
          fontSize: 30,
          marginTop: 20,
        }}>
        {getTitle()}
      </Title>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}>
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
        {language === Language.BERBER && (
          <>
            {berberLinks.map((link, index) => {
              return (
                <TouchableOpacity
                  key={link}
                  onPress={() => downloadLink(link)}
                  style={{
                    backgroundColor: colors.primary,
                    marginHorizontal: 40,
                    marginBottom: 20,
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
                        style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                      />
                      <Image
                        source={require('../images/tifinagh.png')}
                        style={{width: 50, height: 20}}
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
                        style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                      />
                      <Text style={{color: '#fff', fontSize: 15}}>Latin</Text>
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
                        style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                      />
                      <Image
                        source={require('../images/arabic.png')}
                        style={{width: 50, height: 20}}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </>
        )}
        {language === Language.ENGLISH && (
          <Button
            icon="download"
            mode="contained"
            onPress={() => downloadLink(englishLink)}
            uppercase={false}
            style={{margin: 10}}>
            The Quest of Amsiggel (text)
          </Button>
        )}
        {language === Language.FRENCH && (
          <Button
            icon="download"
            mode="contained"
            onPress={() => downloadLink(frenchLink)}
            uppercase={false}
            style={{margin: 10}}>
            Le Voyage d'Amsiggel (texte)
          </Button>
        )}
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
        <Title style={{alignSelf: 'center', marginBottom: 10}}>
          {getTitleText()}
        </Title>
        {language === Language.BERBER && (
          <>
            {berberPDFs.map((link, index) => {
              return (
                <TouchableOpacity
                  key={link}
                  onPress={() => downloadLink(link)}
                  style={{
                    backgroundColor: colors.primary,
                    marginHorizontal: 40,
                    borderRadius: 5,
                    padding: 5,
                    marginBottom: 20,
                  }}>
                  {index === 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="download"
                        color="#fff"
                        style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                      />
                      <Image
                        source={require('../images/tifinagh.png')}
                        style={{width: 50, height: 20}}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  {index === 1 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="download"
                        color="#fff"
                        style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                      />
                      <Text style={{color: '#fff', fontSize: 15}}>Latin</Text>
                    </View>
                  )}
                  {index === 2 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="download"
                        color="#fff"
                        style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                      />
                      <Image
                        source={require('../images/arabic.png')}
                        style={{width: 50, height: 20}}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </>
        )}
        {language === Language.ENGLISH && (
          <>
            <Button
              icon="download"
              mode="contained"
              onPress={() => downloadLink(englishPDF)}
              style={{margin: 20}}
              uppercase={false}>
              Amsiggel and Bubker (text)
            </Button>
          </>
        )}
        {language === Language.FRENCH && (
          <Button
            icon="download"
            mode="contained"
            onPress={() => downloadLink(frenchPDF)}
            style={{margin: 20}}
            uppercase={false}>
            Conversation avec Bubker (texte)
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Story;
