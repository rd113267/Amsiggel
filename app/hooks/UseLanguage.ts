import AsyncStorage from '@react-native-community/async-storage';
import {useState, useEffect} from 'react';
import {Language} from '../types';
const useLanguage = () => {
  const key = '@language';
  const [language, setLanguage] = useState<string>();
  useEffect(() => {
    getLanguage();
  }, []);
  const getLanguage = async () => {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
      await AsyncStorage.setItem(key, Language.BERBER);
      setLanguage(Language.BERBER);
    } else {
      setLanguage(value);
    }
  };
  const setNewLanguage = async (lang: Language) => {
    await AsyncStorage.setItem(key, lang);
    setLanguage(lang);
  };
  return {language, setNewLanguage};
};

export default useLanguage;
