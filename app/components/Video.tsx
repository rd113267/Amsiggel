import React, {FunctionComponent, useState} from 'react';
import {
  SafeAreaView,
  Platform,
  Linking,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabProps from '../types/TabProps';
import colors from '../colors';
import {Text, Title, Paragraph, Caption} from 'react-native-paper';
import {Language} from '../types';

const Videos: FunctionComponent<TabProps> = ({language, navigation}) => {
  const [loading, setLoading] = useState(false);

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

  const getTitle = () => {
    if (language === Language.ENGLISH) {
      return 'links';
    }
    if (language === Language.FRENCH) {
      return 'liens';
    }
    return 'izdayn';
  };

  const openTachelhitApp = () => {

  }

  const openTachelhitWebsite = () => {
    Linking.openURL('https://tachelhit.info')
  }

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
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
          justifyContent: 'center',
          padding: 20,
        }}>
        <Title style={{textAlign: 'center'}}>awal i-wass</Title>
        <TouchableOpacity
          onPress={openAwalIwass}
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}>
          <Icon name="cellphone-android" size={100} />
          <Image
            source={require('../images/logo.png')}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Paragraph style={{textAlign: 'center'}}>{getDescription()}</Paragraph>
        <Title style={{textAlign: 'center'}}>tachelhit info</Title>
        <TouchableOpacity
          onPress={openAwalIwass}
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}>
          <Icon name="cellphone-android" size={100} />
          <Image
            source={require('../images/tachelhitinfo.png')}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Title style={{textAlign: 'center'}}>tachelhit info</Title>
        <TouchableOpacity
          onPress={openTachelhitWebsite}
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly'
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
