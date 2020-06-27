import React, {FunctionComponent } from 'react';
import {View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import colors from '../../colors';
import {Language} from '../../types';

const FlagBanner: FunctionComponent<{
  setNewLanguage: (language: Language) => void;
}> = ({setNewLanguage}) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.primary,
        paddingVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          setNewLanguage(Language.BERBER);
        }}>
        <Image
          style={{height: 30, width: 40}}
          resizeMode="contain"
          source={require('../../images/tas2.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setNewLanguage(Language.ENGLISH);
        }}>
        <Image
          style={{height: 30, width: 40}}
          resizeMode="contain"
          source={require('../../images/uk-flag.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setNewLanguage(Language.FRENCH);
        }}>
        <Image
          style={{height: 30, width: 40}}
          resizeMode="contain"
          source={require('../../images/france-flag.png')}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FlagBanner;
