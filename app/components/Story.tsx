import React, {FunctionComponent, useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import TabProps from '../types/TabProps';
import {Language} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {downloadLink} from '../helpers';
import {Button, Title, ActivityIndicator} from 'react-native-paper';

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
  const [downloading, setDownloading] = useState(false);
  const [downloadingSecondary, setDownloadingSecondary] = useState(false);

  const [downloadingTifinagh, setDownloadingTifinagh] = useState(false);
  const [downloadingLatin, setDownloadingLatin] = useState(false);
  const [downloadingArabic, setDownloadingArabic] = useState(false);
  const [downloadingLatinSecondary, setDownloadingLatinSecondary] = useState(
    false,
  );
  const [
    downloadingTifinaghSecondary,
    setDownloadingTifinaghSecondary,
  ] = useState(false);
  const [downloadingArabicSecondary, setDownloadingArabicSecondary] = useState(
    false,
  );

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
      return 'texts';
    }
    if (language === Language.FRENCH) {
      return 'textes';
    }
    return 'arratn ';
  };

  const downloadBerberPrimary = async (link: string, index: number) => {
    switch (index) {
      case 0:
        setDownloadingTifinagh(true);
        break;
      case 1:
        setDownloadingLatin(true);
        break;
      default:
        setDownloadingArabic(true);
    }
    await downloadLink(link, `Amuddu n-Umsiggel-${index + 1}`, true);
    switch (index) {
      case 0:
        setDownloadingTifinagh(false);
        break;
      case 1:
        setDownloadingLatin(false);
        break;
      default:
        setDownloadingArabic(false);
    }
  };

  const downloadBerberSecondary = async (link: string, index: number) => {
    switch (index) {
      case 0:
        setDownloadingTifinaghSecondary(true);
        break;
      case 1:
        setDownloadingLatinSecondary(true);
        break;
      default:
        setDownloadingArabicSecondary(true);
    }
    await downloadLink(link, `Amsiggel d-Bubker-${index + 1}`, true);
    switch (index) {
      case 0:
        setDownloadingTifinaghSecondary(false);
        break;
      case 1:
        setDownloadingLatinSecondary(false);
        break;
      default:
        setDownloadingArabicSecondary(false);
    }
  };

  const primaryDisabled = (index: number) => {
    return (
      (index === 0 && downloadingTifinagh) ||
      (index === 1 && downloadingLatin) ||
      (index === 2 && downloadingArabic)
    );
  };

  const secondaryDisabled = (index: number) => {
    return (
      (index === 0 && downloadingTifinaghSecondary) ||
      (index === 1 && downloadingLatinSecondary) ||
      (index === 2 && downloadingArabicSecondary)
    );
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Title
        style={{
          textAlign: 'center',
          fontSize: 30,
          marginTop: 10,
        }}>
        {getTitle()}
      </Title>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent:
            language === Language.BERBER ? 'flex-start' : 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            minHeight: Dimensions.get('window').width / 4,
            alignItems: 'center',
          }}>
          {firstRowImages.map(image => {
            return (
              <Image
                key={image}
                style={{flex: 1}}
                resizeMode="contain"
                resizeMethod="resize"
                source={image}
              />
            );
          })}
        </View>
        {language === Language.BERBER && (
          <View style={{marginTop: -15}}>
            <Title style={{alignSelf: 'center', marginBottom: 10}}>
              Amuddu n-Umsiggel
            </Title>
            {berberLinks.map((link, index) => {
              return (
                <TouchableOpacity
                  key={link}
                  onPress={() => downloadBerberPrimary(link, index)}
                  disabled={primaryDisabled(index)}
                  style={{
                    backgroundColor: colors.primary,
                    marginHorizontal: 40,
                    marginBottom: index === 2 ? 0 : 15,
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
                      {downloadingTifinagh ? (
                        <ActivityIndicator
                          color="#fff"
                          size={18}
                          style={{marginRight: 10}}
                        />
                      ) : (
                        <Icon
                          name="download"
                          color="#fff"
                          style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                        />
                      )}
                      <Image
                        source={require('../images/tifinagh.png')}
                        style={{width: 70, height: 25}}
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
                      {downloadingLatin ? (
                        <ActivityIndicator
                          color="#fff"
                          size={18}
                          style={{marginRight: 10}}
                        />
                      ) : (
                        <Icon
                          name="download"
                          color="#fff"
                          style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                        />
                      )}
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
                      {downloadingArabic ? (
                        <ActivityIndicator
                          color="#fff"
                          size={18}
                          style={{marginRight: 10}}
                        />
                      ) : (
                        <Icon
                          name="download"
                          color="#fff"
                          style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                        />
                      )}
                      <Image
                        source={require('../images/arabic.png')}
                        style={{width: 70, height: 25}}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        {language === Language.ENGLISH && (
          <Button
            icon="download"
            mode="contained"
            loading={downloading}
            onPress={async () => {
              setDownloading(true);
              await downloadLink(
                englishLink,
                'The Quest of Amsiggel (text)',
                true,
              );
              setDownloading(false);
            }}
            uppercase={false}
            labelStyle={{fontSize: 20}}
            style={{margin: 20}}>
            The Quest of Amsiggel (text)
          </Button>
        )}
        {language === Language.FRENCH && (
          <Button
            icon="download"
            mode="contained"
            onPress={async () => {
              setDownloading(true);
              await downloadLink(
                frenchLink,
                "Le Voyage d'Amsiggel (texte)",
                true,
              );
              setDownloading(false);
            }}
            uppercase={false}
            labelStyle={{fontSize: 20}}
            style={{margin: 20}}>
            Le Voyage d'Amsiggel (texte)
          </Button>
        )}
        <View
          style={{
            flexDirection: 'row',
            minHeight: Dimensions.get('window').width / 4,
            alignItems: 'center',
          }}>
          {secondRowImages.map(image => {
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
          <View style={{marginTop: -15}}>
            <Title style={{alignSelf: 'center', marginBottom: 10}}>
              Amsiggel d-Bubker
            </Title>
            {berberPDFs.map((link, index) => {
              return (
                <TouchableOpacity
                  key={link}
                  disabled={secondaryDisabled(index)}
                  onPress={() => downloadBerberSecondary(link, index)}
                  style={{
                    backgroundColor: colors.primary,
                    marginHorizontal: 40,
                    borderRadius: 5,
                    padding: 5,
                    marginBottom: index === 2 ? 0 : 15,
                  }}>
                  {index === 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {downloadingTifinaghSecondary ? (
                        <ActivityIndicator
                          color="#fff"
                          size={18}
                          style={{marginRight: 10}}
                        />
                      ) : (
                        <Icon
                          name="download"
                          color="#fff"
                          style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                        />
                      )}
                      <Image
                        source={require('../images/tifinagh.png')}
                        style={{width: 70, height: 25}}
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
                      {downloadingLatinSecondary ? (
                        <ActivityIndicator
                          color="#fff"
                          size={18}
                          style={{marginRight: 10}}
                        />
                      ) : (
                        <Icon
                          name="download"
                          color="#fff"
                          style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                        />
                      )}
                      <Text style={{color: '#fff', fontSize: 20}}>Latin</Text>
                    </View>
                  )}
                  {index === 2 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {downloadingArabicSecondary ? (
                        <ActivityIndicator
                          color="#fff"
                          size={18}
                          style={{marginRight: 10}}
                        />
                      ) : (
                        <Icon
                          name="download"
                          color="#fff"
                          style={{fontSize: 18, marginRight: 10, marginTop: 2}}
                        />
                      )}
                      <Image
                        source={require('../images/arabic.png')}
                        style={{width: 70, height: 25}}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        {language === Language.ENGLISH && (
          <>
            <Button
              icon="download"
              mode="contained"
              loading={downloadingSecondary}
              onPress={async () => {
                setDownloadingSecondary(true);
                await downloadLink(
                  englishPDF,
                  'Amsiggel and Bubker (text)',
                  true,
                );
                setDownloadingSecondary(false);
              }}
              style={{margin: 20}}
              labelStyle={{fontSize: 20}}
              uppercase={false}>
              Amsiggel and Bubker (text)
            </Button>
          </>
        )}
        {language === Language.FRENCH && (
          <Button
            icon="download"
            mode="contained"
            loading={downloadingSecondary}
            onPress={async () => {
              setDownloadingSecondary(true);
              await downloadLink(frenchPDF, 'Amsiggel et Bubker (texte)', true);
              setDownloadingSecondary(false);
            }}
            style={{margin: 20}}
            labelStyle={{fontSize: 20}}
            uppercase={false}>
            Amsiggel et Bubker (texte)
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Story;
