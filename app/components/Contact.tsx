import React, {FunctionComponent, useState} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import TabProps from '../types/TabProps';
import FlagBanner from './commons/FlagBanner';
import {TextInput, Button} from 'react-native-paper';
import {Language} from '../types';

const Contact: FunctionComponent<TabProps> = ({language}) => {
  const getNameLabel = () => {
    if (language === Language.BERBER) {
      return 'ism-nnek';
    }
    if (language === Language.FRENCH) {
      return 'Nom';
    }
    return 'Name';
  };
  const getTelephoneLabel = () => {
    if (language === Language.BERBER) {
      return 'tilifun-nnek';
    }
    if (language === Language.FRENCH) {
      return 'Téléphone';
    }
    return 'Telephone';
  };
  const getEmailLabel = () => {
    if (language === Language.BERBER) {
      return 'email-nnek';
    }
    return 'E-Mail';
  };
  const getMessageLabel = () => {
    if (language === Language.BERBER) {
      return 'awal-nnek';
    }
    return 'Message';
  };

  const getSendLabel = () => {
    if (language === Language.BERBER) {
      return 'azn awal';
    }
    if (language === Language.FRENCH) {
      return 'Soumettre';
    }
    return 'Send';
  };
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <SafeAreaView style={{margin: 20}}>
      <TextInput
        label={getNameLabel()}
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={{marginBottom: 10}}
      />
      <TextInput
        label={getTelephoneLabel()}
        value={telephone}
        onChangeText={setTelephone}
        mode="outlined"
        style={{marginBottom: 10}}
        keyboardType="numeric"
      />
      <TextInput
        label={getEmailLabel()}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        style={{marginBottom: 10}}
      />
      <TextInput
        label={getMessageLabel()}
        value={message}
        onChangeText={setMessage}
        mode="outlined"
        multiline
        numberOfLines={10}
        style={{marginBottom: 20}}
      />
      <Button onPress={() => Alert.alert('coming soon')} mode="contained">
        {getSendLabel()}
      </Button>
    </SafeAreaView>
  );
};

export default Contact;
