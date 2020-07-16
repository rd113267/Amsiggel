import React, {FunctionComponent, useState} from 'react';
import {
  SafeAreaView,
  Platform,
  Linking,
  Image,
  TouchableOpacity,
  View,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import TabProps from '../types/TabProps';
import {Button, Headline} from 'react-native-paper';
import {Language} from '../types';
import {downloadLink} from '../helpers';
import colors from '../colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Videos: FunctionComponent<TabProps> = ({language, navigation}) => {
  const [loading, setLoading] = useState(false);
  const baseURL = 'https://www.amsiggel.com/wp-content/uploads/dlm_uploads/';

  const englishPDF = `${baseURL}2014/07/Bubker%20traduction%20anglaise.pdf`;

  const berberPDFs = [
    `${baseURL}2014/06/Bubker-Tifinagh-transcription.pdf`,
    `${baseURL}2014/07/Bubker%20caracteres%20latins.pdf`,
    `${baseURL}2014/06/Bubker-Arabic-transcription.pdf`,
  ];

  const frenchPDF =
    'https://www.amsiggel.com/wp-content/uploads/2016/01/Conversation-avec-Bubker.pdf';

  const englishMp3 = 'https://www.amsiggel.com/download/646/';
  const berberMp3 = 'https://www.amsiggel.com/download/632/';

  const openAwalIwass = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'ios') {
        await Linking.openURL(
          'itms-apps://apps.apple.com/gb/app/awal-i-wass/id1511054521',
        );
      } else {
        await Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.wordofgodforeachday',
        );
      }
      setLoading(false);
    } catch (e) {
      Alert.alert('Error', e.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center', padding: 20}}>
        <TouchableOpacity onPress={openAwalIwass}>
          <Image
            source={require('../images/logo.png')}
            style={{height: 100, alignSelf: 'center'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Button
          loading={loading}
          onPress={openAwalIwass}
          style={{marginBottom: 40}}
          icon="download"
          mode="contained"
          uppercase={false}>
          awal i-wass
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Image source={require('../images/bubker1.png')} />
          <Image source={require('../images/bubker2.png')} />
        </View>
        {language === Language.BERBER && (
          <>
            <Headline style={{alignSelf: 'center', marginBottom: 10}}>
              Amsiggel d Bubker
            </Headline>
            {berberPDFs.map((link, index) => {
              return (
                <TouchableOpacity
                  key={link}
                  onPress={() => downloadLink(link)}
                  style={{
                    backgroundColor: colors.primary,
                    marginBottom: 20,
                    borderRadius: 5,
                    padding: 5,
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
            <Button
              icon="download"
              mode="contained"
              onPress={() => downloadLink(berberMp3)}
              style={{marginBottom: 20}}
              uppercase={false}>
              Amsiggel Bubker mp3
            </Button>
          </>
        )}
        {language === Language.ENGLISH && (
          <>
            <Button
              icon="download"
              mode="contained"
              onPress={() => downloadLink(englishPDF)}
              style={{marginBottom: 20}}
              uppercase={false}>
              Amsiggel and Bubker
            </Button>
            <Button
              icon="download"
              mode="contained"
              onPress={() => downloadLink(englishMp3)}
              style={{marginBottom: 20}}
              uppercase={false}>
              Amsiggel Bubker mp3
            </Button>
          </>
        )}
        {language === Language.FRENCH && (
          <Button
            icon="download"
            mode="contained"
            onPress={() => downloadLink(frenchPDF)}
            style={{marginBottom: 20}}
            uppercase={false}>
            Conversation avec Bubker
          </Button>
        )}
        <Button
          style={{marginBottom: 20, marginTop: 40}}
          mode="contained"
          icon="gavel"
          onPress={() => navigation.navigate('Legal')}
          uppercase={false}>
          {language && language === Language.ENGLISH
            ? 'Legal'
            : 'Mentions légales'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Videos;
