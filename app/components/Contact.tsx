import React, {FunctionComponent, useState} from 'react';
import {SafeAreaView, Linking, Platform, Alert} from 'react-native';
import TabProps from '../types/TabProps';
import {Button} from 'react-native-paper';
import {Language} from '../types';

const Contact: FunctionComponent<TabProps> = ({language}) => {
  const [loading, setLoading] = useState(false);
  const PHONE_NUMBER = '+212642596841';
  const getWhatsAppLabel = () => {
    if (language === Language.BERBER) {
      return 'sawl-agh-d s-watsapp';
    }
    if (language === Language.FRENCH) {
      return 'Contactez-nous via WhatsApp';
    }
    return 'Contact us via WhatsApp';
  };
  const openWhatsApp = async () => {
    setLoading(true);
    try {
      await Linking.openURL(`whatsapp://send?phone=${PHONE_NUMBER}`);
      setLoading(false);
    } catch (e) {
      try {
        if (Platform.OS === 'ios') {
          await Linking.openURL(
            'itms-apps://apps.apple.com/gb/app/whatsapp-messenger/id310633997',
          );
        } else {
          await Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.whatsapp',
          );
        }
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', error.message);
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', margin: 20}}>
      <Button
        uppercase={false}
        loading={loading}
        icon="whatsapp"
        labelStyle={{ fontSize: 20 }}
        onPress={openWhatsApp}
        mode="contained">
        sawl-agh-d s-watsapp
      </Button>
      
    </SafeAreaView>
  );
};

export default Contact;
