import React, {FunctionComponent} from 'react';
import {
  SafeAreaView,
  Platform,
  Linking,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabProps from '../types/TabProps';
import colors from '../colors';
import {Text, Title, Paragraph, Caption} from 'react-native-paper';
import {Language} from '../types';
import globalStyles from '../styles/globalStyles';

const Videos: FunctionComponent<TabProps> = ({language, navigation}) => {
  const getDescription = () => {
    if (language === Language.ENGLISH) {
      return 'Each day we will send you a word of hope and assurance from the Tashelhayt Bible.';
    }
    if (language === Language.FRENCH) {
      return "Chaque jour, nous vous enverrons une parole d'espoir et d'assurance tirée de la Bible en tachelhit.";
    }
    return 'ass f-wass rad-ak-ntazn awal imimn gh-warratn n-sidi rbbi. sfeld-as ar-ttzaamt s-rrja ishan.';
  };
  const openAwalIwass = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL(
          'itms-apps://apps.apple.com/gb/app/awal-i-wass/id1511054521',
        );
      } else {
        await Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.wordofgodforeachday',
        );
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const getTitle = () => {
    if (language === Language.ENGLISH) {
      return 'links';
    }
    if (language === Language.FRENCH) {
      return 'liens';
    }
    return 'izdayn';
  };

  const openTachelhitApp = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL(
          'https://apps.apple.com/us/app/tachelhit-info/id1530749221',
        );
      } else {
        await Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.tachelhitinfo',
        );
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const openTachelhitWebsite = () => {
    Linking.openURL('https://tachelhit.info');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Title
        style={{
          textAlign: 'center',
          fontSize: 30,
          marginTop: 10,
          marginBottom: 20,
        }}>
        {getTitle()}
      </Title>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
        }}>
        <Title style={{textAlign: 'center'}}>awal i-wass</Title>
        <TouchableOpacity
          onPress={openAwalIwass}
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Icon name="cellphone-android" size={100} />
          <Image
            source={require('../images/logo.png')}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Paragraph style={{textAlign: 'center', marginBottom: 10}}>
          {getDescription()}
        </Paragraph>
        <Title style={{textAlign: 'center', marginTop: 20}}>
          tachelhit info
        </Title>
        <TouchableOpacity
          onPress={openTachelhitApp}
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Icon name="cellphone-android" size={100} />
          <Image
            source={require('../images/tachelhitinfo.png')}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openTachelhitWebsite}
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Icon name="monitor" size={100} />
          <Image
            source={require('../images/tachelhitinfo.png')}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Videos;
