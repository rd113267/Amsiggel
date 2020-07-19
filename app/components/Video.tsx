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

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 20,
        }}>
        <Title style={{ textAlign: 'center'}}>awal i-wass</Title>
        <TouchableOpacity
          onPress={openAwalIwass}
          style={{
            borderColor: colors.primary,
            borderWidth: 2,
            width: 110,
            alignSelf: 'center',
            borderRadius: 7,
            marginVertical: 10,
          }}>
          <Image
            source={require('../images/logo.png')}
            style={{height: 100, alignSelf: 'center'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Paragraph style={{ textAlign: 'center'}}>{getDescription()}</Paragraph>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Videos;
